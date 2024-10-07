import { createWriteStream } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';


const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const writableStream = createWriteStream(filePath);
    
    process.stdin.pipe(writableStream);
    
    writableStream.on('error', (err) => {
        console.error('FS operation failed', err);
    });

};

await write();