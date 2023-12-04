const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');

let mainWindow;
let tray;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  await mainWindow.loadFile('client/dist/challenge3-front/browser/index.html');
  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
}

app.whenReady().then(async () => {
  await createWindow().catch();
  tray = new Tray(path.join(__dirname, 'assets/populis_icon.png'));
  tray.on('click', () => {
    mainWindow.show();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (mainWindow === null) {
    await createWindow().catch();
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});