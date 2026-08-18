const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  silentPrint: (html, printerName) => ipcRenderer.invoke('silent-print', { html, printerName }),
  listPrinters: () => ipcRenderer.invoke('list-printers'),
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', (event, data) => callback(data)),
  openDownloadPage: () => ipcRenderer.invoke('open-download-page')
});
