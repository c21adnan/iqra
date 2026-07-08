<?php
declare(strict_types=1);

session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$storagePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'iqra-courses.json';
$isLoggedIn = (($_SESSION['iqra_admin'] ?? false) === true);

function send_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_text($value, int $limit = 500): string
{
    $value = is_string($value) ? trim(strip_tags($value)) : '';
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? '';
    return substr($value, 0, $limit);
}

function slugify(string $value): string
{
    $value = strtolower(trim($value));
    $value = preg_replace('/[^a-z0-9]+/', '-', $value) ?? '';
    $value = trim($value, '-');
    return $value !== '' ? substr($value, 0, 120) : 'course-' . gmdate('YmdHis');
}

function read_courses(string $storagePath): array
{
    if (!file_exists($storagePath)) {
        return [];
    }

    $json = file_get_contents($storagePath);
    if ($json === false || trim($json) === '') {
        return [];
    }

    $decoded = json_decode($json, true);
    return is_array($decoded) ? $decoded : [];
}

function write_courses(string $storagePath, array $courses): bool
{
    $body = json_encode(array_values($courses), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    if ($body === false) {
        return false;
    }
    return file_put_contents($storagePath, $body . PHP_EOL, LOCK_EX) !== false;
}

function normalize_course(array $input, ?array $existing = null): array
{
    $now = gmdate('c');
    $title = clean_text($input['title'] ?? '', 180);
    if ($title === '') {
        $title = 'Untitled course';
    }

    $modules = [];
    foreach (($input['modules'] ?? []) as $moduleIndex => $moduleInput) {
        if (!is_array($moduleInput)) {
            continue;
        }

        $moduleTitle = clean_text($moduleInput['title'] ?? '', 180);
        if ($moduleTitle === '') {
            $moduleTitle = 'Module ' . ($moduleIndex + 1);
        }

        $lessons = [];
        foreach (($moduleInput['lessons'] ?? []) as $lessonIndex => $lessonInput) {
            if (!is_array($lessonInput)) {
                continue;
            }

            $lessonTitle = clean_text($lessonInput['title'] ?? '', 180);
            if ($lessonTitle === '') {
                $lessonTitle = 'Lesson ' . ($lessonIndex + 1);
            }

            $lessons[] = [
                'id' => clean_text($lessonInput['id'] ?? '', 80) ?: uniqid('lesson_', true),
                'title' => $lessonTitle,
                'format' => clean_text($lessonInput['format'] ?? 'Video', 40),
                'duration' => clean_text($lessonInput['duration'] ?? '', 40),
                'access' => clean_text($lessonInput['access'] ?? 'Included', 60),
                'mediaUrl' => clean_text($lessonInput['mediaUrl'] ?? '', 500),
                'resourceUrl' => clean_text($lessonInput['resourceUrl'] ?? '', 500),
                'position' => $lessonIndex + 1,
            ];
        }

        $modules[] = [
            'id' => clean_text($moduleInput['id'] ?? '', 80) ?: uniqid('module_', true),
            'title' => $moduleTitle,
            'position' => $moduleIndex + 1,
            'lessons' => $lessons,
        ];
    }

    return [
        'id' => clean_text($input['id'] ?? '', 80) ?: ($existing['id'] ?? uniqid('course_', true)),
        'slug' => clean_text($input['slug'] ?? '', 140) ?: slugify($title),
        'title' => $title,
        'audience' => clean_text($input['audience'] ?? '', 180),
        'promise' => clean_text($input['promise'] ?? '', 220),
        'description' => clean_text($input['description'] ?? '', 1200),
        'status' => clean_text($input['status'] ?? 'Draft', 40),
        'modules' => $modules,
        'createdAt' => $existing['createdAt'] ?? $now,
        'updatedAt' => $now,
    ];
}

if (!$isLoggedIn) {
    send_json([
        'ok' => false,
        'authenticated' => false,
        'message' => 'Sign in through leads admin before saving courses to the server.',
    ], 401);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$courses = read_courses($storagePath);

if ($method === 'GET' && isset($_GET['public'])) {
    $published = array_values(array_filter($courses, static function ($course): bool {
        return is_array($course) && strtolower((string) ($course['status'] ?? '')) === 'published';
    }));

    send_json([
        'ok' => true,
        'authenticated' => false,
        'storage' => 'json',
        'courses' => $published,
    ]);
}

if ($method === 'GET') {
    send_json([
        'ok' => true,
        'authenticated' => true,
        'storage' => 'json',
        'courses' => array_values($courses),
    ]);
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $payload = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($payload)) {
        send_json(['ok' => false, 'message' => 'Invalid JSON body.'], 400);
    }

    $incoming = $payload['course'] ?? $payload;
    if (!is_array($incoming)) {
        send_json(['ok' => false, 'message' => 'Missing course payload.'], 400);
    }

    $id = clean_text($incoming['id'] ?? '', 80);
    $existingIndex = null;
    foreach ($courses as $index => $course) {
        if (is_array($course) && (($id !== '' && ($course['id'] ?? '') === $id) || (($course['slug'] ?? '') === ($incoming['slug'] ?? null)))) {
            $existingIndex = $index;
            break;
        }
    }

    $course = normalize_course($incoming, $existingIndex !== null && is_array($courses[$existingIndex]) ? $courses[$existingIndex] : null);
    if ($existingIndex === null) {
        $courses[] = $course;
    } else {
        $courses[$existingIndex] = $course;
    }

    if (!write_courses($storagePath, $courses)) {
        send_json(['ok' => false, 'message' => 'The course storage file could not be written.'], 500);
    }

    send_json([
        'ok' => true,
        'authenticated' => true,
        'course' => $course,
        'courses' => array_values($courses),
    ]);
}

send_json(['ok' => false, 'message' => 'Unsupported method.'], 405);
