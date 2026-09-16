const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  silentPrint: (html, printerName) => ipcRenderer.invoke('silent-print', { html, printerName }),
  silentPrintIP: (base64Data, ip, port) => ipcRenderer.invoke('silent-print-ip', { base64Data, ip, port }),
  listPrinters: () => ipcRenderer.invoke('list-printers'),
  onUpdateAvailable: (callback) => ipcRenderer.on('update-available', (event, data) => callback(data)),
  openDownloadPage: () => ipcRenderer.invoke('open-download-page')
});
