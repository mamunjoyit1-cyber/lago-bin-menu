const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

// ── FIX: keep login persistent across launches ──
// The portable .exe unpacks itself into a fresh temp folder every time it
// runs. If the app's login/session data lived inside that temp folder, it
// would vanish the moment the app closes — forcing a re-login every time.
// Pinning userData to a stable, permanent location (%APPDATA%) fixes this:
// Firebase Auth's session (stored here via localStorage/IndexedDB) now
// survives closing the app, restarting the PC, and even updating to a new
// build.
app.setPath('userData', path.join(app.getPath('appData'), 'LagoBinAdmin'));

// ── FIX: keep the taskbar pin working across updates ──
// Windows ties a pinned taskbar shortcut to the app's identity (its
// AppUserModelID), not just the filename. Every rebuilt .exe has different
// file content, so without an explicit, stable ID, Windows can treat each
// new version as a "different" program and drop the pin. Setting this
// keeps the same pin working release after release.
app.setAppUserModelId('it.lagobin.admin');

let mainWindow;

// ── UPDATE SOURCE ──
// The website hosts both the download page and a tiny version.json.
// On startup, this app checks that file — if the published version is
// newer than the one currently running, it shows a banner inside the app
// linking back to the download page (no silent auto-install, since that
// would need code signing to avoid a fresh SmartScreen warning every time
// anyway — a manual re-download is simpler and just as reliable).
const UPDATE_CHECK_URL = 'https://mamunjoyit1-cyber.github.io/downloads/version.json';
const DOWNLOAD_PAGE_URL = 'https://mamunjoyit1-cyber.github.io/downloads/';

function isNewerVersion(remote, current) {
  const r = String(remote).split('.').map(Number);
  const c = String(current).split('.').map(Number);
  for (let i = 0; i < Math.max(r.length, c.length); i++) {
    const rv = r[i] || 0, cv = c[i] || 0;
    if (rv > cv) return true;
    if (rv < cv) return false;
  }
  return false;
}

async function checkForUpdate() {
  try {
    const res = await fetch(UPDATE_CHECK_URL, { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    const currentVersion = app.getVersion();
    if (data.version && isNewerVersion(data.version, currentVersion) && mainWindow) {
      mainWindow.webContents.send('update-available', {
        remoteVersion: data.version,
        notes: data.notes || ''
      });
    }
  } catch (err) {
    console.error('Update check failed:', err);
  }
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1320,
    height: 880,
    title: 'Lago Bin — Admin',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('index.html');
  mainWindow.webContents.once('did-finish-load', () => {
    setTimeout(checkForUpdate, 3000);
  });
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});

// ── SILENT PRINT ──
// Renders the given receipt HTML off-screen (with the same self-hosted
// Montserrat fonts as the on-screen app), then sends it straight to the
// named Windows printer with no dialog and no confirmation popup.
//
// This writes the receipt to a real temporary .html file and loads it with
// loadFile() rather than a data: URL, which avoids issues with long/complex
// HTML being mis-parsed.
const fontDir = app.isPackaged
  ? path.join(process.resourcesPath, 'fonts')
  : path.join(__dirname, 'fonts');

ipcMain.handle('silent-print', async (event, { html, printerName }) => {
  const tempPath = path.join(os.tmpdir(), 'lagobin-receipt-' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.html');

  const fontDirUrl = fontDir.replace(/\\/g, '/');
  const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
      @font-face{font-family:'Montserrat';src:url('file:///${fontDirUrl}/Montserrat-Regular.woff2') format('woff2');font-weight:400;}
      @font-face{font-family:'Montserrat';src:url('file:///${fontDirUrl}/Montserrat-Medium.woff2') format('woff2');font-weight:500;}
      @font-face{font-family:'Montserrat';src:url('file:///${fontDirUrl}/Montserrat-SemiBold.woff2') format('woff2');font-weight:600;}
      *{box-sizing:border-box;}
      body{margin:0;padding:4mm;width:72mm;font-family:'Montserrat',sans-serif;color:#000;}
      .receipt-table-big{text-align:center;font-size:23px;font-weight:600;margin-bottom:10px;letter-spacing:0.5px;}
      .receipt-title{text-align:center;font-size:18px;font-weight:500;margin-bottom:6px;color:#333;}
      .receipt-meta{font-size:18px;font-weight:400;line-height:1.5;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #000;}
      .receipt-meta b{font-weight:600;}
      .receipt-turno{text-align:center;font-weight:600;font-size:21px;margin:14px 0 8px;padding-top:10px;border-top:1px dashed #000;text-transform:uppercase;letter-spacing:0.5px;}
      .receipt-item{font-size:19px;font-weight:400;margin-bottom:10px;display:flex;justify-content:space-between;align-items:flex-start;gap:10px;}
      .receipt-item .rleft{flex:1;}
      .receipt-item .rname{font-weight:500;}
      .receipt-item .rdetail{display:block;font-size:16px;font-weight:400;color:#333;margin-top:4px;}
      .ritem-price{font-weight:500;font-size:19px;white-space:nowrap;}
      .rqty{font-weight:500;}
      .menu-fisso-tag{font-size:12px;font-weight:500;border:1px solid #000;border-radius:4px;padding:1px 6px;margin-left:4px;letter-spacing:0.3px;white-space:nowrap;}
      .receipt-total{border-top:1.5px solid #000;margin-top:12px;padding-top:10px;font-size:22px;font-weight:600;text-align:right;}
      .receipt-online-tag{text-align:center;font-size:16px;font-weight:500;border:1.5px dashed #000;border-radius:4px;padding:6px;margin-top:10px;}
      .receipt-footer{text-align:center;font-size:16px;font-weight:500;letter-spacing:1px;margin-top:16px;padding-top:10px;border-top:1px solid #000;text-transform:uppercase;}
      </style></head><body>${html}</body></html>`;

  try {
    fs.writeFileSync(tempPath, fullHtml, 'utf8');
  } catch (err) {
    throw new Error('Could not write temp receipt file: ' + err.message);
  }

  return new Promise((resolve, reject) => {
    const printWin = new BrowserWindow({ show: false });

    function cleanup() {
      fs.unlink(tempPath, () => {}); // best-effort delete, ignore errors
    }

    printWin.webContents.once('did-finish-load', () => {
      // Small delay lets the embedded fonts finish loading before print —
      // same reasoning as the double-rAF fix used in the browser version.
      setTimeout(() => {
        printWin.webContents.print(
          {
            silent: true,
            deviceName: printerName,
            printBackground: true,
            margins: { marginType: 'none' }
          },
          (success, errorType) => {
            printWin.close();
            cleanup();
            if (success) resolve(true);
            else reject(new Error(errorType || 'Print failed'));
          }
        );
      }, 300);
    });

    printWin.webContents.once('did-fail-load', (e, code, desc) => {
      printWin.close();
      cleanup();
      reject(new Error('Failed to render receipt: ' + desc));
    });

    printWin.loadFile(tempPath);
  });
});

// Lets the renderer list installed printers (useful for a future settings
// screen where the restaurant picks which printer maps to which route).
ipcMain.handle('list-printers', async () => {
  if (!mainWindow) return [];
  const printers = await mainWindow.webContents.getPrintersAsync();
  return printers.map(p => p.name);
});

ipcMain.handle('open-download-page', () => {
  shell.openExternal(DOWNLOAD_PAGE_URL);
});
