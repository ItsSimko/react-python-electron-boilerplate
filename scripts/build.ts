import { spawn } from 'child_process';
const [ , , command ] = process.argv;

switch (command) {
    case 'python':
        buildPython();
        break;
}

function buildPython() {
    const pyInstallerProcess = spawn('.venv\\Scripts\\python', ['-m', 'PyInstaller', '--onefile', 'src/backend/main.py'], {
        stdio: 'inherit',
        shell: true,
    });

    pyInstallerProcess.on('close', (code) => {
        if (code === 0) {
            console.log("Python backend built successfully.");
        } else {
            console.error(`Python backend build failed with code ${code}.`);
        }
    });
}
