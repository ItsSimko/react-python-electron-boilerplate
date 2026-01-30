import { spawn } from 'child_process';
import getPort from 'get-port';

const [ , , command ] = process.argv;

switch (command) {
    case 'dev':
        startDeveloperMode();
        break;
}

function startDeveloperMode() {

    console.log("Starting in developer mode...");

    const port: Promise<number> = getPort({ port: 5173 });

    // start the react development server with the port from getPort
    port.then(portNumber => {
        const viteProcess = spawn('yarn', ['run', 'start:react', `--port=${portNumber}`], {
            stdio: 'inherit',
            shell: true,
        });

        const electronProcess = spawn('yarn', ['run', 'start:electron'], {
            stdio: 'inherit',
            shell: true,
            env: { ...process.env, VITE_DEV_SERVER_PORT: String(portNumber) },
        });

        // start python processes
        const pythonProcess = spawn('python', ['src/backend/main.py'], {
            stdio: 'inherit',
            shell: true,
        });

        // Cleanup function to kill all processes
        const cleanup = () => {
            console.log('\nShutting down...');
            viteProcess.kill();
            console.log("Vite process terminated.");
            electronProcess.kill();
            console.log("Electron process terminated.");
            pythonProcess.kill();
            console.log("Python process terminated.");
            process.exit();
        };

        // Handle various exit signals
        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
        process.on('exit', cleanup);

        // Exit when Electron closes
        electronProcess.on('close', () => {
            viteProcess.kill();
            pythonProcess.kill();
            process.exit();
        });
    });
}