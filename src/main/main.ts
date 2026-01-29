import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

console.log("Is Dev Mode: ", isDev);

const PORT = process.env.VITE_DEV_SERVER_PORT || '5173';

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (isDev) {
    win.loadURL(`http://localhost:${PORT}`);
  } else {
    win.loadFile('./dist/index.html');
  }
}

app.whenReady().then(createWindow)