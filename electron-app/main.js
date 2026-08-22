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

// ── SILENT PRINT (IMAGE MODE) ──
// Renders the receipt off-screen with the same self-hosted Montserrat
// fonts as the on-screen app, takes a screenshot of it, and prints THAT
// IMAGE instead of the HTML page itself.
//
// Why: the HTML/CSS approach kept producing a garbled printout on this
// printer's Windows driver — it appeared to dump the raw <style> block as
// visible text above an otherwise-correct render, a known quirk with some
// thermal-printer drivers when handed complex CSS/web-font HTML. Printing
// a plain image sidesteps that entirely: the printer receives pixels, not
// markup, so there is nothing for the driver to misinterpret. This matches
// what a "screenshot of the browser preview" would look like — guaranteed
// to be pixel-identical to the correct on-screen render.
const fontDir = app.isPackaged
  ? path.join(process.resourcesPath, 'fonts')
  : path.join(__dirname, 'fonts');

const PRINT_WIDTH_PX = 576; // ≈72mm at 203dpi, a common thermal-printer resolution

ipcMain.handle('silent-print', async (event, { html, printerName }) => {
  const tempPath = path.join(os.tmpdir(), 'lagobin-receipt-' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.html');
  const fontDirUrl = fontDir.replace(/\\/g, '/');
  const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
      @font-face{font-family:'Montserrat';src:url('file:///${fontDirUrl}/Montserrat-Regular.woff2') format('woff2');font-weight:400;}
      @font-face{font-family:'Montserrat';src:url('file:///${fontDirUrl}/Montserrat-Medium.woff2') format('woff2');font-weight:500;}
      @font-face{font-family:'Montserrat';src:url('file:///${fontDirUrl}/Montserrat-SemiBold.woff2') format('woff2');font-weight:600;}
      *{box-sizing:border-box;}
      html,body{margin:0;padding:0;}
      body{width:${PRINT_WIDTH_PX}px;padding:16px;font-family:'Montserrat',sans-serif;color:#000;background:#fff;}
      .receipt-table-big{text-align:center;font-size:34px;font-weight:600;margin-bottom:14px;letter-spacing:0.5px;}
      .receipt-title{text-align:center;font-size:26px;font-weight:500;margin-bottom:8px;color:#333;}
      .receipt-meta{font-size:26px;font-weight:400;line-height:1.5;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #000;}
      .receipt-meta b{font-weight:600;}
      .receipt-turno{text-align:center;font-weight:600;font-size:30px;margin:18px 0 10px;padding-top:14px;border-top:1px dashed #000;text-transform:uppercase;letter-spacing:0.5px;}
      .receipt-item{font-size:27px;font-weight:400;margin-bottom:14px;display:flex;justify-content:space-between;align-items:flex-start;gap:14px;}
      .receipt-item .rleft{flex:1;}
      .receipt-item .rname{font-weight:500;}
      .receipt-item .rdetail{display:block;font-size:22px;font-weight:400;color:#333;margin-top:6px;}
      .ritem-price{font-weight:500;font-size:27px;white-space:nowrap;}
      .rqty{font-weight:500;}
      .menu-fisso-tag{font-size:17px;font-weight:500;border:1px solid #000;border-radius:4px;padding:2px 8px;margin-left:6px;letter-spacing:0.3px;white-space:nowrap;}
      .receipt-total{border-top:1.5px solid #000;margin-top:16px;padding-top:14px;font-size:32px;font-weight:600;text-align:right;}
      .receipt-online-tag{text-align:center;font-size:22px;font-weight:500;border:1.5px dashed #000;border-radius:4px;padding:8px;margin-top:14px;}
      .receipt-footer{text-align:center;font-size:22px;font-weight:500;letter-spacing:1px;margin-top:22px;padding-top:14px;border-top:1px solid #000;text-transform:uppercase;}
      </style></head><body>${html}</body></html>`;

  try {
    fs.writeFileSync(tempPath, fullHtml, 'utf8');
  } catch (err) {
    throw new Error('Could not write temp receipt file: ' + err.message);
  }

  return new Promise((resolve, reject) => {
    const renderWin = new BrowserWindow({ show: false, width: PRINT_WIDTH_PX, height: 800 });
    let imgTempPath = null;

    function cleanup() {
      fs.unlink(tempPath, () => {});
      if (imgTempPath) fs.unlink(imgTempPath, () => {});
    }

    renderWin.webContents.once('did-finish-load', async () => {
      try {
        // Let fonts finish loading, then size the window to the receipt's
        // actual rendered height so the screenshot captures all of it.
        await new Promise(r => setTimeout(r, 350));
        const contentHeight = await renderWin.webContents.executeJavaScript('Math.ceil(document.body.scrollHeight)');
        renderWin.setContentSize(PRINT_WIDTH_PX, Math.max(contentHeight, 50));
        await new Promise(r => setTimeout(r, 150)); // let layout settle after resize

        const image = await renderWin.webContents.capturePage();
        const dataUrl = image.toDataURL();

        const imgHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
          *{margin:0;padding:0;}
          @page{size:72mm auto;margin:0;}
          body{width:72mm;}
          img{width:100%;display:block;}
        </style></head><body><img src="${dataUrl}"></body></html>`;
        imgTempPath = tempPath.replace('.html', '-img.html');
        fs.writeFileSync(imgTempPath, imgHtml, 'utf8');

        const printWin = new BrowserWindow({ show: false });
        printWin.webContents.once('did-finish-load', () => {
          setTimeout(() => {
            printWin.webContents.print(
              { silent: true, deviceName: printerName, printBackground: true, margins: { marginType: 'none' } },
              (success, errorType) => {
                renderWin.close();
                printWin.close();
                cleanup();
                if (success) resolve(true);
                else reject(new Error(errorType || 'Print failed'));
              }
            );
          }, 150);
        });
        printWin.webContents.once('did-fail-load', (e, code, desc) => {
          renderWin.close();
          printWin.close();
          cleanup();
          reject(new Error('Failed to render receipt image: ' + desc));
        });
        printWin.loadFile(imgTempPath);
      } catch (err) {
        renderWin.close();
        cleanup();
        reject(err);
      }
    });

    renderWin.webContents.once('did-fail-load', (e, code, desc) => {
      renderWin.close();
      cleanup();
      reject(new Error('Failed to render receipt: ' + desc));
    });

    renderWin.loadFile(tempPath);
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
