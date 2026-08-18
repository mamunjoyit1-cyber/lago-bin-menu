# Lago Bin Admin — Desktop App

This wraps the same admin dashboard (`index.html`) in a Windows desktop app,
adding **silent printing**: approving an order sends the receipt straight to
the correct printer with no popup, no "select a printer" dialog.

The exact same `index.html` still works as a normal web page (e.g. on
GitHub Pages) — when it detects it's *not* running inside this desktop app,
it falls back to the regular browser print dialog automatically. Nothing
about the existing Firebase logic, printer routing, or order handling was
changed.

## First-time setup (on your Mac, once)

```bash
cd electron-app
npm install
```

## Run it locally to test (opens a normal window, not packaged yet)

```bash
npm start
```

## Build the portable Windows .exe

```bash
npm run build:win
```

This produces a single portable `.exe` in `dist/` — no installer, staff just
double-click it. Copy that file to the restaurant's Windows PC (e.g. onto the
Desktop) and run it there.

## Important: printer names must match exactly

Inside `index.html`, search for `PRINTER_ROUTES`. The `printer:` values
there (e.g. `"POS-80C (Ristorante3)"`) must be typed **exactly** as they
appear in Windows' printer list on that PC (Settings → Printers & scanners).
If a name doesn't match exactly, silent printing to that printer will fail
with an error alert naming which printer it tried to use.

## Updating the dashboard later

Whenever the admin dashboard (`admin1-test.html` / eventual `admin.html`)
gets updated, just replace `electron-app/index.html` with the new version
and rebuild (`npm run build:win`) — nothing else needs to change, since the
silent-print hook (`window.electronAPI`) is already wired into the shared
`printJobs()` function.

## Known limitation

This must be built and print-tested on an actual Windows PC with the real
printers installed — it can't be verified from a Mac. `npm start` on Mac
will run the app and open the window fine, but printing will obviously
target Mac printers, not the restaurant's POS printers.

## Releasing an update (automated — recommended)

A GitHub Actions workflow (`.github/workflows/build-release.yml`) now does
the build-and-publish steps for you, on GitHub's own Windows machines (no
wine, no local `npm run build:win` needed):

1. Bump `"version"` in `electron-app/package.json` (e.g. `1.0.0` → `1.0.1`)
2. `git add`, `git commit`, `git push` (just the normal push you'd do anyway)
3. GitHub Actions automatically: installs dependencies → builds the Windows
   portable `.exe` on a Windows runner → copies it into `downloads/` →
   writes a matching `downloads/version.json` → commits and pushes that
   back to your repo

That's the whole release process — no manual copying, no exe files to drag
around. Every running copy of the app checks `version.json` on startup and
shows the update banner automatically once this finishes (usually a few
minutes after your push — check the "Actions" tab on GitHub to watch
progress or see errors).

**One-time setup required:** in your repo, go to
**Settings → Actions → General → Workflow permissions**, and select
**"Read and write permissions"** — otherwise the workflow can build the app
but won't be allowed to push the result back to `downloads/`.

You can also trigger a build manually anytime (without changing anything)
from the **Actions** tab → **Build and Publish Admin App** → **Run workflow**.

## Releasing an update (manual — fallback)

If you ever need to do it by hand instead (e.g. Actions is down, or you
want to build locally to test first):


The app is downloaded from, and checks for updates against,
`https://mamunjoyit1-cyber.github.io/downloads/` — a `downloads/` folder in
your GitHub Pages repo containing:

- `index.html` — the public download page (works with no login)
- `LagoBinAdmin.exe` — the built app
- `version.json` — `{ "version": "1.0.1", "notes": "..." }`

To publish a new version:

1. Bump `"version"` in `electron-app/package.json` (e.g. `1.0.0` → `1.0.1`)
2. `npm run build:win` — produces `dist/LagoBinAdmin.exe`
3. Copy that file over `downloads/LagoBinAdmin.exe` in your repo
4. Update `downloads/version.json` with the same version number + short notes
5. `git push`

That's it — every install of the app checks `version.json` on startup and
shows a gold banner at the top ("🔔 Nuova versione disponibile — Clicca qui
per scaricarla") if the published version is newer than the one running.
Clicking it opens the download page in the default browser; staff re-run the
new `.exe` to update (no silent auto-install, so there's no code-signing
requirement to worry about).
