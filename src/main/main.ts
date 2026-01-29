import { app, BrowserWindow } from 'electron';

const PORT = process.env.VITE_DEV_SERVER_PORT || '5173';

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(`http://localhost:${PORT}`);
}

app.whenReady().then(createWindow)