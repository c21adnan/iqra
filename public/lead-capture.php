<?php
declare(strict_types=1);

function clean_text(string $value, int $limit = 120): string
{
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? '';
    return substr($value, 0, $limit);
}

$name = clean_text($_POST['name'] ?? '');
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$goal = clean_text($_POST['goal'] ?? '');
$source = clean_text($_POST['source'] ?? 'iqra-funnel');
$consent = ($_POST['consent'] ?? '') === 'yes';
$honeypot = clean_text($_POST['website'] ?? '');

$ok = false;
$message = 'Please go back and enter a valid name and email address.';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $honeypot !== '') {
    $ok = true;
    $message = 'You are on the IQRA launch list.';
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $name !== '' && $email !== false && $consent) {
    $storagePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'iqra-leads.csv';
    $isNewFile = !file_exists($storagePath);
    $handle = fopen($storagePath, 'c+b');

    if ($handle !== false) {
        flock($handle, LOCK_EX);
        $emailExists = false;

        rewind($handle);
        while (($row = fgetcsv($handle)) !== false) {
            if (isset($row[2]) && strtolower(trim((string) $row[2])) === strtolower((string) $email)) {
                $emailExists = true;
                break;
            }
        }

        fseek($handle, 0, SEEK_END);
        if ($isNewFile) {
            fputcsv($handle, ['created_at', 'name', 'email', 'goal', 'source', 'ip']);
        }
        if (!$emailExists) {
            fputcsv($handle, [gmdate('c'), $name, strtolower((string) $email), $goal, $source, $_SERVER['REMOTE_ADDR'] ?? '']);
        }
        flock($handle, LOCK_UN);
        fclose($handle);

        $ok = true;
        $message = $emailExists
            ? 'This email is already on the IQRA launch list, so no duplicate was added.'
            : 'You are on the IQRA launch list. The lead was captured successfully.';
    } else {
        $message = 'The form is working, but the server could not open the lead storage file.';
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && !$consent) {
    $message = 'Please confirm that you agree to receive IQRA emails.';
}

http_response_code($ok ? 200 : 400);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>IQRA Lead Capture</title>
    <style>
      body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #f7f7f2; color: #17221d; }
      main { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      section { width: min(720px, 100%); border: 1px solid rgba(0,0,0,.1); border-radius: 32px; background: #fff; padding: 40px; box-shadow: 0 24px 80px rgba(23,63,53,.12); }
      p.kicker { color: #b15e35; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
      h1 { font-size: clamp(40px, 8vw, 64px); line-height: .98; letter-spacing: -.05em; margin: 12px 0 16px; }
      p { line-height: 1.7; color: rgba(23,34,29,.68); }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
      a { border-radius: 14px; color: inherit; font-size: 14px; font-weight: 700; padding: 13px 18px; text-decoration: none; }
      a.primary { background: #173f35; color: #fff; }
      a.secondary { border: 1px solid rgba(0,0,0,.14); background: #f7f7f2; }
    </style>
  </head>
  <body>
    <main>
      <section>
        <p class="kicker"><?php echo $ok ? 'Lead captured' : 'Lead capture issue'; ?></p>
        <h1><?php echo $ok ? 'Thank you.' : 'Almost there.'; ?></h1>
        <p><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></p>
        <div class="actions">
          <a class="primary" href="/pricing/">View pricing</a>
          <a class="secondary" href="/funnel/">Back to funnel</a>
        </div>
      </section>
    </main>
  </body>
</html>
