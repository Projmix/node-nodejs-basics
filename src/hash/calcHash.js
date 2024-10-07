import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';


const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');
    
    const input = createReadStream(filePath);
    input.on('data', (chunk) => hash.update(chunk));
    
    input.on('end', () => {
        console.log(hash.digest('hex'));
    });
    
    input.on('error', (err) => {
        console.error('FS operation failed', err);
    });
};

await calculateHash();