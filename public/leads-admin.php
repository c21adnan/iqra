<?php
declare(strict_types=1);

session_start();

$configPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'iqra-admin-config.php';
$resetCodePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'iqra-admin-reset-code.php';
$storagePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'iqra-leads.csv';
$passwordHash = getenv('IQRA_ADMIN_PASSWORD_HASH') ?: '';
if ($passwordHash === '' && file_exists($configPath)) {
    $storedHash = require $configPath;
    $passwordHash = is_string($storedHash) ? $storedHash : '';
}
$resetCodeHash = getenv('IQRA_ADMIN_RESET_CODE_HASH') ?: '';
if ($resetCodeHash === '' && file_exists($resetCodePath)) {
    $storedResetHash = require $resetCodePath;
    $resetCodeHash = is_string($storedResetHash) ? $storedResetHash : '';
}
$isConfigured = $passwordHash !== '';
$hasResetCode = $resetCodeHash !== '';
$error = '';
$message = '';

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function read_leads(string $storagePath): array
{
    if (!file_exists($storagePath)) {
        return [];
    }

    $handle = fopen($storagePath, 'rb');
    if ($handle === false) {
        return [];
    }

    $rows = [];
    while (($row = fgetcsv($handle)) !== false) {
        $rows[] = $row;
    }
    fclose($handle);

    return $rows;
}

if (!$isConfigured && $_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['mode'] ?? '') === 'setup') {
    $password = (string) ($_POST['password'] ?? '');
    $confirmPassword = (string) ($_POST['confirm_password'] ?? '');

    if (strlen($password) < 10) {
        $error = 'Use at least 10 characters for the admin password.';
    } elseif ($password !== $confirmPassword) {
        $error = 'The two password entries do not match.';
    } else {
        $newHash = password_hash($password, PASSWORD_DEFAULT);
        $configBody = "<?php\nreturn " . var_export($newHash, true) . ";\n";
        if (file_put_contents($configPath, $configBody, LOCK_EX) !== false) {
            $_SESSION['iqra_admin'] = true;
            header('Location: /leads-admin.php');
            exit;
        }
        $error = 'The password is valid, but the server could not create the private admin config file.';
    }
}

if ($isConfigured && $_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['mode'] ?? '') === 'login') {
    $password = (string) ($_POST['password'] ?? '');
    if (password_verify($password, $passwordHash)) {
        $_SESSION['iqra_admin'] = true;
        header('Location: /leads-admin.php');
        exit;
    }
    $error = 'The admin password is not correct.';
}

if ($isConfigured && $_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['mode'] ?? '') === 'reset') {
    $resetCode = (string) ($_POST['reset_code'] ?? '');
    $password = (string) ($_POST['password'] ?? '');
    $confirmPassword = (string) ($_POST['confirm_password'] ?? '');

    if (!$hasResetCode) {
        $error = 'Password reset is not configured yet. Use cPanel recovery instructions below.';
    } elseif (!password_verify($resetCode, $resetCodeHash)) {
        $error = 'The reset code is not correct.';
    } elseif (strlen($password) < 10) {
        $error = 'Use at least 10 characters for the new admin password.';
    } elseif ($password !== $confirmPassword) {
        $error = 'The two password entries do not match.';
    } else {
        $newHash = password_hash($password, PASSWORD_DEFAULT);
        $configBody = "<?php\nreturn " . var_export($newHash, true) . ";\n";
        if (file_put_contents($configPath, $configBody, LOCK_EX) !== false) {
            $_SESSION['iqra_admin'] = true;
            $passwordHash = $newHash;
            $message = 'The admin password was reset and you are signed in.';
        } else {
            $error = 'The reset code was valid, but the server could not update the private admin config file.';
        }
    }
}

if (isset($_GET['logout'])) {
    unset($_SESSION['iqra_admin']);
    header('Location: /leads-admin.php');
    exit;
}

$isLoggedIn = $isConfigured && (($_SESSION['iqra_admin'] ?? false) === true);
$showForgotPassword = $isConfigured && !$isLoggedIn && isset($_GET['forgot']);

if ($isLoggedIn && isset($_GET['download'])) {
    if (!file_exists($storagePath)) {
        http_response_code(404);
        echo 'No leads file exists yet.';
        exit;
    }

    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="iqra-leads.csv"');
    header('Content-Length: ' . filesize($storagePath));
    readfile($storagePath);
    exit;
}

$rows = $isLoggedIn ? read_leads($storagePath) : [];
$headers = $rows[0] ?? [];
$leads = array_slice($rows, 1);
$recentLeads = array_reverse(array_slice($leads, -25));
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IQRA Leads Admin</title>
    <style>
      body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #f7f7f2; color: #17221d; }
      main { min-height: 100vh; padding: 32px; }
      .wrap { margin: 0 auto; max-width: 1120px; }
      .card { border: 1px solid rgba(0,0,0,.1); border-radius: 32px; background: #fff; padding: 32px; box-shadow: 0 24px 80px rgba(23,63,53,.10); }
      .hero { background: #173f35; color: #fff; }
      .hero p { color: rgba(255,255,255,.65); }
      .kicker { color: #b15e35; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
      .hero .kicker { color: rgba(255,255,255,.58); }
      h1 { font-size: clamp(40px, 8vw, 64px); line-height: .98; letter-spacing: -.05em; margin: 12px 0 16px; }
      h2 { font-size: 28px; letter-spacing: -.03em; margin: 0 0 16px; }
      p { line-height: 1.7; color: rgba(23,34,29,.65); }
      code { background: #f7f7f2; border-radius: 8px; padding: 3px 6px; }
      form { display: grid; gap: 12px; margin-top: 20px; max-width: 420px; }
      input { border: 1px solid rgba(0,0,0,.12); border-radius: 16px; font-size: 16px; padding: 14px 16px; }
      button, a.button { border: 0; border-radius: 14px; background: #173f35; color: #fff; cursor: pointer; display: inline-block; font-size: 14px; font-weight: 700; padding: 13px 18px; text-decoration: none; }
      a.secondary { background: #f7f7f2; color: #17221d; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
      .grid { display: grid; gap: 20px; margin-top: 24px; }
      .stats { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
      .stat { border-radius: 24px; background: #f7f7f2; padding: 20px; }
      .stat strong { display: block; font-size: 32px; letter-spacing: -.04em; }
      table { border-collapse: collapse; margin-top: 20px; width: 100%; }
      th, td { border-bottom: 1px solid rgba(0,0,0,.08); padding: 14px 10px; text-align: left; vertical-align: top; }
      th { color: rgba(23,34,29,.48); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }
      .error { background: #fff1ed; border-radius: 16px; color: #9a3412; padding: 14px 16px; }
      .success { background: #e8f5ef; border-radius: 16px; color: #14532d; padding: 14px 16px; }
      .empty { background: #f7f7f2; border-radius: 20px; padding: 20px; }
      .notice { background: #f7f7f2; border-radius: 20px; padding: 18px 20px; }
    </style>
  </head>
  <body>
    <main>
      <div class="wrap">
        <section class="card hero">
          <p class="kicker">IQRA admin</p>
          <h1>Lead capture control room.</h1>
          <p>View recent opt-ins and download the CSV captured by the cPanel PHP funnel form.</p>
          <div class="actions">
            <a class="button secondary" href="/dashboard/">Back to dashboard</a>
            <a class="button secondary" href="/funnel/">Open funnel</a>
            <?php if ($isLoggedIn): ?>
              <a class="button secondary" href="/leads-admin.php?logout=1">Log out</a>
            <?php endif; ?>
          </div>
        </section>

        <?php if (!$isConfigured): ?>
          <section class="card" style="margin-top: 24px;">
            <p class="kicker">First-time setup</p>
            <h2>Create the admin password.</h2>
            <?php if ($error !== ''): ?>
              <p class="error"><?php echo h($error); ?></p>
            <?php endif; ?>
            <p>
              The password hash will be saved to a private PHP config file outside the public website folder, so it will not be stored in GitHub.
            </p>
            <form method="post" action="/leads-admin.php">
              <input type="hidden" name="mode" value="setup">
              <input type="password" name="password" placeholder="Create admin password" required minlength="10">
              <input type="password" name="confirm_password" placeholder="Confirm admin password" required minlength="10">
              <button type="submit">Create admin password</button>
            </form>
          </section>
        <?php elseif ($showForgotPassword): ?>
          <section class="card" style="margin-top: 24px;">
            <p class="kicker">Password recovery</p>
            <h2>Reset the admin password.</h2>
            <?php if ($message !== ''): ?>
              <p class="success"><?php echo h($message); ?></p>
            <?php endif; ?>
            <?php if ($error !== ''): ?>
              <p class="error"><?php echo h($error); ?></p>
            <?php endif; ?>
            <?php if ($hasResetCode): ?>
              <p>Enter the private reset code and choose a new admin password.</p>
              <form method="post" action="/leads-admin.php?forgot=1">
                <input type="hidden" name="mode" value="reset">
                <input type="password" name="reset_code" placeholder="Private reset code" required>
                <input type="password" name="password" placeholder="New admin password" required minlength="10">
                <input type="password" name="confirm_password" placeholder="Confirm new password" required minlength="10">
                <button type="submit">Reset admin password</button>
              </form>
            <?php else: ?>
              <div class="notice">
                <p><strong>No reset code is configured yet.</strong></p>
                <p>
                  To reset safely, open cPanel File Manager and rename or remove
                  <code>/home/imranali/iqra-admin-config.php</code>. Then open this page again and create a new admin password.
                </p>
                <p>
                  For future self-service resets, create a private file named
                  <code>/home/imranali/iqra-admin-reset-code.php</code> that returns a PHP password hash for your reset code.
                </p>
              </div>
            <?php endif; ?>
            <div class="actions">
              <a class="button secondary" href="/leads-admin.php">Back to admin sign-in</a>
            </div>
          </section>
        <?php elseif (!$isLoggedIn): ?>
          <section class="card" style="margin-top: 24px;">
            <p class="kicker">Protected leads</p>
            <h2>Sign in to view captured leads.</h2>
            <?php if ($error !== ''): ?>
              <p class="error"><?php echo h($error); ?></p>
            <?php endif; ?>
            <form method="post" action="/leads-admin.php">
              <input type="hidden" name="mode" value="login">
              <input type="password" name="password" placeholder="Admin password" required>
              <button type="submit">Open leads admin</button>
            </form>
            <div class="actions">
              <a class="button secondary" href="/leads-admin.php?forgot=1">Forgot password?</a>
            </div>
          </section>
        <?php else: ?>
          <section class="grid stats">
            <div class="stat">
              <span>Total leads</span>
              <strong><?php echo count($leads); ?></strong>
            </div>
            <div class="stat">
              <span>Storage</span>
              <strong>CSV</strong>
            </div>
            <div class="stat">
              <span>Location</span>
              <strong>Private</strong>
            </div>
          </section>

          <section class="card" style="margin-top: 24px;">
            <div class="actions" style="justify-content: space-between; margin-top: 0;">
              <div>
                <p class="kicker">Recent leads</p>
                <h2>Latest opt-ins</h2>
              </div>
              <a class="button" href="/leads-admin.php?download=1">Download CSV</a>
            </div>

            <?php if (count($leads) === 0): ?>
              <p class="empty">No leads have been captured yet.</p>
            <?php else: ?>
              <table>
                <thead>
                  <tr>
                    <?php foreach ($headers as $header): ?>
                      <th><?php echo h($header); ?></th>
                    <?php endforeach; ?>
                  </tr>
                </thead>
                <tbody>
                  <?php foreach ($recentLeads as $lead): ?>
                    <tr>
                      <?php foreach ($headers as $index => $header): ?>
                        <td><?php echo h($lead[$index] ?? ''); ?></td>
                      <?php endforeach; ?>
                    </tr>
                  <?php endforeach; ?>
                </tbody>
              </table>
            <?php endif; ?>
          </section>
        <?php endif; ?>
      </div>
    </main>
  </body>
</html>
