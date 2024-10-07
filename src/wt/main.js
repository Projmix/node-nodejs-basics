import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';


const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const cpuCount = os.cpus().length;
    const results = [];

    const createWorker = (workerData) => {
        return new Promise((resolve) => {
            const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData });
            worker.on('message', (message) => resolve(message));
            worker.on('error', () => resolve({ status: 'error', data: null }));
        });
    };

    const promises = [];
    for (let i = 0; i < cpuCount; i++) {
        promises.push(createWorker(10 + i));
    }

    const workerResults = await Promise.all(promises);
    workerResults.forEach((result) => results.push(result));

    console.log(results);
};

await performCalculations();