# Doteasy deployment

GitHub Actions builds this project and sends only the generated static files to Doteasy. The Doteasy server never runs the memory-intensive Next.js build.

## GitHub Secrets

Create a `production` environment and add:

- `DOTEASY_FTP_SERVER`: the FTP/FTPS hostname shown in cPanel.
- `DOTEASY_FTP_USERNAME`: an FTP account with access to the domain root.
- `DOTEASY_FTP_PASSWORD`: the FTP account password.
- `DOTEASY_SERVER_DIR`: the FTP path for `breuae.com`, with a trailing slash.

Never commit passwords or place them directly in the workflow.

Remove the temporary cPanel Node application mapping only after the first FTPS deployment succeeds.
