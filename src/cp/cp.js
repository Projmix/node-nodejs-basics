import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const scriptPath = path.join(__dirname, 'files', 'script.js');
    
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'] 
    });

    process.stdin.pipe(child.stdin);

    child.stdout.pipe(process.stdout);

    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
