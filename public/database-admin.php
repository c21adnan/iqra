<?php
declare(strict_types=1);

session_start();

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function connect_database(array $config): PDO
{
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=utf8mb4',
        $config['host'],
        $config['database']
    );

    return new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}

function migration_statements(): array
{
    return [
        "CREATE TABLE IF NOT EXISTS iqra_courses (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            owner_key VARCHAR(191) NOT NULL,
            slug VARCHAR(191) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT NULL,
            status VARCHAR(32) NOT NULL DEFAULT 'draft',
            access_level VARCHAR(64) NOT NULL DEFAULT 'members',
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uq_course_owner_slug (owner_key, slug),
            KEY idx_course_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        "CREATE TABLE IF NOT EXISTS iqra_modules (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            course_id BIGINT UNSIGNED NOT NULL,
            title VARCHAR(255) NOT NULL,
            position INT UNSIGNED NOT NULL DEFAULT 0,
            status VARCHAR(32) NOT NULL DEFAULT 'draft',
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            KEY idx_module_course_position (course_id, position),
            CONSTRAINT fk_module_course FOREIGN KEY (course_id) REFERENCES iqra_courses(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        "CREATE TABLE IF NOT EXISTS iqra_lessons (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            module_id BIGINT UNSIGNED NOT NULL,
            slug VARCHAR(191) NOT NULL,
            title VARCHAR(255) NOT NULL,
            summary TEXT NULL,
            content_type VARCHAR(32) NOT NULL DEFAULT 'video',
            position INT UNSIGNED NOT NULL DEFAULT 0,
            duration_seconds INT UNSIGNED NULL,
            status VARCHAR(32) NOT NULL DEFAULT 'draft',
            is_preview TINYINT(1) NOT NULL DEFAULT 0,
            release_after_days INT UNSIGNED NOT NULL DEFAULT 0,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uq_lesson_module_slug (module_id, slug),
            KEY idx_lesson_module_position (module_id, position),
            CONSTRAINT fk_lesson_module FOREIGN KEY (module_id) REFERENCES iqra_modules(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        "CREATE TABLE IF NOT EXISTS iqra_media_assets (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            lesson_id BIGINT UNSIGNED NOT NULL,
            provider VARCHAR(32) NOT NULL,
            provider_asset_id VARCHAR(191) NULL,
            playback_id VARCHAR(191) NULL,
            upload_status VARCHAR(32) NOT NULL DEFAULT 'waiting',
            duration_seconds INT UNSIGNED NULL,
            thumbnail_url TEXT NULL,
            captions_url TEXT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uq_media_lesson (lesson_id),
            KEY idx_media_provider_asset (provider, provider_asset_id),
            CONSTRAINT fk_media_lesson FOREIGN KEY (lesson_id) REFERENCES iqra_lessons(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        "CREATE TABLE IF NOT EXISTS iqra_enrollments (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            course_id BIGINT UNSIGNED NOT NULL,
            member_key VARCHAR(191) NOT NULL,
            status VARCHAR(32) NOT NULL DEFAULT 'active',
            enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME NULL,
            UNIQUE KEY uq_enrollment_course_member (course_id, member_key),
            KEY idx_enrollment_member (member_key),
            CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES iqra_courses(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
        "CREATE TABLE IF NOT EXISTS iqra_lesson_progress (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            lesson_id BIGINT UNSIGNED NOT NULL,
            member_key VARCHAR(191) NOT NULL,
            watched_seconds INT UNSIGNED NOT NULL DEFAULT 0,
            completed_at DATETIME NULL,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY uq_progress_lesson_member (lesson_id, member_key),
            KEY idx_progress_member (member_key),
            CONSTRAINT fk_progress_lesson FOREIGN KEY (lesson_id) REFERENCES iqra_lessons(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
    ];
}

$configPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'iqra-database-config.php';
$isLoggedIn = (($_SESSION['iqra_admin'] ?? false) === true);
$csrfToken = $_SESSION['iqra_database_csrf'] ?? bin2hex(random_bytes(24));
$_SESSION['iqra_database_csrf'] = $csrfToken;
$message = '';
$error = '';
$config = file_exists($configPath) ? require $configPath : null;
$config = is_array($config) ? $config : null;
$connected = false;
$tableCount = 0;

if ($isLoggedIn && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $submittedToken = (string) ($_POST['csrf_token'] ?? '');
    if (!hash_equals($csrfToken, $submittedToken)) {
        $error = 'The setup session expired. Refresh this page and try again.';
    } else {
        $candidate = [
            'host' => trim((string) ($_POST['host'] ?? 'localhost')),
            'database' => trim((string) ($_POST['database'] ?? '')),
            'username' => trim((string) ($_POST['username'] ?? '')),
            'password' => (string) ($_POST['password'] ?? ''),
        ];

        if ($candidate['host'] === '' || $candidate['database'] === '' || $candidate['username'] === '') {
            $error = 'Host, database name, and database username are required.';
        } else {
            try {
                $pdo = connect_database($candidate);
                foreach (migration_statements() as $statement) {
                    $pdo->exec($statement);
                }

                $configBody = "<?php\nreturn " . var_export($candidate, true) . ";\n";
                if (file_put_contents($configPath, $configBody, LOCK_EX) === false) {
                    throw new RuntimeException('The private database configuration file could not be saved.');
                }

                $config = $candidate;
                $message = 'Database connected and all IQRA LMS tables are ready.';
            } catch (Throwable $exception) {
                $error = 'Connection or setup failed. Confirm the cPanel database name, user, password, and user privileges.';
            }
        }
    }
}

if ($isLoggedIn && $config !== null) {
    try {
        $pdo = connect_database($config);
        $connected = true;
        $tableCount = (int) $pdo
            ->query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name LIKE 'iqra_%'")
            ->fetchColumn();
    } catch (Throwable $exception) {
        $error = $error ?: 'Saved database settings exist, but the connection is not currently available.';
    }
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IQRA Database Setup</title>
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #f7f7f2; color: #17221d; }
      main { min-height: 100vh; padding: 32px; }
      .wrap { margin: 0 auto; max-width: 1040px; }
      .card { border: 1px solid rgba(0,0,0,.1); border-radius: 32px; background: #fff; padding: 32px; }
      .hero { background: #173f35; color: #fff; box-shadow: 0 24px 80px rgba(23,63,53,.12); }
      .hero p { color: rgba(255,255,255,.8); }
      .kicker { color: #8f4322; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
      .hero .kicker { color: rgba(255,255,255,.8); }
      h1 { font-size: clamp(40px, 7vw, 64px); line-height: .98; letter-spacing: -.05em; margin: 12px 0 16px; }
      h2 { font-size: 28px; letter-spacing: -.03em; margin: 0 0 16px; }
      p { line-height: 1.7; color: rgba(23,34,29,.7); }
      form { display: grid; gap: 14px; margin-top: 24px; max-width: 600px; }
      label { display: grid; gap: 7px; font-size: 14px; font-weight: 700; }
      input { border: 1px solid rgba(0,0,0,.14); border-radius: 14px; font-size: 16px; padding: 13px 15px; }
      button, a.button { border: 0; border-radius: 14px; background: #173f35; color: #fff; cursor: pointer; display: inline-block; font-size: 14px; font-weight: 700; padding: 13px 18px; text-decoration: none; }
      a.secondary { background: #f7f7f2; color: #17221d; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
      .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 24px; }
      .stat { border-radius: 24px; background: #f7f7f2; padding: 20px; }
      .stat strong { display: block; font-size: 28px; margin-top: 8px; }
      .success, .error { border-radius: 16px; padding: 14px 16px; }
      .success { background: #e8f5ef; color: #14532d; }
      .error { background: #fff1ed; color: #9a3412; }
      code { background: #f7f7f2; border-radius: 8px; padding: 3px 6px; }
    </style>
  </head>
  <body>
    <main>
      <div class="wrap">
        <section class="card hero">
          <p class="kicker">Protected system setup</p>
          <h1>Connect the IQRA course database.</h1>
          <p>The credentials are saved outside the public website directory and are never stored in GitHub.</p>
          <div class="actions">
            <a class="button secondary" href="/studio/">Back to Course Studio</a>
            <a class="button secondary" href="/dashboard/">Dashboard</a>
          </div>
        </section>

        <?php if (!$isLoggedIn): ?>
          <section class="card" style="margin-top: 24px;">
            <p class="kicker">Admin required</p>
            <h2>Sign in through the leads admin first.</h2>
            <p>This database screen uses the same protected IQRA administrator session.</p>
            <a class="button" href="/leads-admin.php">Open admin sign-in</a>
          </section>
        <?php else: ?>
          <section class="grid">
            <div class="stat"><span>Connection</span><strong><?php echo $connected ? 'Ready' : 'Not connected'; ?></strong></div>
            <div class="stat"><span>IQRA tables</span><strong><?php echo $tableCount; ?> / 6</strong></div>
            <div class="stat"><span>Credentials</span><strong>Private</strong></div>
          </section>

          <section class="card" style="margin-top: 24px;">
            <p class="kicker">MySQL configuration</p>
            <h2><?php echo $connected ? 'Update or verify the connection.' : 'Enter the Doteasy database details.'; ?></h2>
            <?php if ($message !== ''): ?><p class="success"><?php echo h($message); ?></p><?php endif; ?>
            <?php if ($error !== ''): ?><p class="error"><?php echo h($error); ?></p><?php endif; ?>
            <p>Create the database and database user in cPanel first, then grant that user all privileges on the database.</p>
            <form action="/database-admin.php" method="post">
              <input type="hidden" name="csrf_token" value="<?php echo h($csrfToken); ?>">
              <label>Database host<input name="host" required value="<?php echo h($config['host'] ?? 'localhost'); ?>"></label>
              <label>Database name<input name="database" required value="<?php echo h($config['database'] ?? ''); ?>"></label>
              <label>Database username<input name="username" required value="<?php echo h($config['username'] ?? ''); ?>"></label>
              <label>Database password<input name="password" required type="password"></label>
              <button type="submit">Test connection and create tables</button>
            </form>
          </section>

          <section class="card" style="margin-top: 24px;">
            <p class="kicker">Tables created</p>
            <h2>Course persistence foundation</h2>
            <p>
              The installer creates <code>iqra_courses</code>, <code>iqra_modules</code>, <code>iqra_lessons</code>,
              <code>iqra_media_assets</code>, <code>iqra_enrollments</code>, and <code>iqra_lesson_progress</code>.
            </p>
          </section>
        <?php endif; ?>
      </div>
    </main>
  </body>
</html>
