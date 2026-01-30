import { spawn } from 'child_process';
const [ , , command ] = process.argv;

switch (command) {
    case 'python':
        buildPython();
        break;
}

function buildPython() {
    console.log("Building Python backend...");
    const pyInstallerProcess = spawn('uv', [
        'run', 'pyinstaller',
        '--onefile',
        '--collect-all=flask',
        '--collect-all=flask_cors',
        '--noconsole',
        'src/backend/main.py'
    ], {
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
