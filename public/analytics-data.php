<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$storagePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'iqra-leads.csv';
$total = 0;
$lastSevenDays = 0;
$today = 0;
$now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
$todayStart = $now->setTime(0, 0);
$sevenDaysAgo = $now->modify('-7 days');

if (is_readable($storagePath)) {
    $handle = fopen($storagePath, 'rb');

    if ($handle !== false) {
        flock($handle, LOCK_SH);
        $isHeader = true;

        while (($row = fgetcsv($handle)) !== false) {
            if ($isHeader) {
                $isHeader = false;
                continue;
            }

            if (count($row) < 3 || filter_var($row[2], FILTER_VALIDATE_EMAIL) === false) {
                continue;
            }

            $total++;

            try {
                $createdAt = new DateTimeImmutable($row[0], new DateTimeZone('UTC'));
                if ($createdAt >= $sevenDaysAgo) {
                    $lastSevenDays++;
                }
                if ($createdAt >= $todayStart) {
                    $today++;
                }
            } catch (Exception $exception) {
                // A malformed date should not prevent the remaining leads from being counted.
            }
        }

        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

echo json_encode([
    'captured_leads' => $total,
    'leads_last_7_days' => $lastSevenDays,
    'leads_today' => $today,
    'updated_at' => gmdate('c'),
]);
