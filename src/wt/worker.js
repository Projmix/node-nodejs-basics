import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
    const result = nthFibonacci(workerData);
    parentPort.postMessage({ status: 'resolved', data: result });
};

try {
    sendResult();
} catch (error) {
    parentPort.postMessage({ status: 'error', data: null });
}