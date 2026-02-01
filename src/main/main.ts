import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { spawn, ChildProcess, execSync } from 'child_process';
import path from 'path';

const PORT = process.env.VITE_DEV_SERVER_PORT || '5173';

let pythonProcess: ChildProcess | null = null;

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

  // spawn the python backend exe as a managed sub process
  const pythonBackendPath = path.join(process.resourcesPath, 'app', 'dist', 'main.exe');
  
  pythonProcess = spawn(pythonBackendPath, [], {
    stdio: 'inherit',
    detached: false
  });
}


function killPythonProcess() {
  if (pythonProcess && pythonProcess.pid) {
    // On Windows, use taskkill to forcefully kill the process tree
    // TODO: Add cross paltform support
    if (process.platform === 'win32') {
      execSync(`taskkill /pid ${pythonProcess.pid} /T /F`, { stdio: 'ignore' });
    } else {
      pythonProcess.kill('SIGTERM');
    }
    pythonProcess = null;
  }
}

app.whenReady().then(createWindow);

// Clean up Python process when app is closing
app.on('before-quit', killPythonProcess);
app.on('will-quit', killPythonProcess);

// Handle window-all-closed event mainly for Windows
app.on('window-all-closed', () => {
  killPythonProcess();
  app.quit();
});