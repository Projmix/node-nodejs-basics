import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    const stream = createReadStream(filePath, 'utf8');

    stream.pipe(process.stdout);

    stream.on('error', (err) => {
        console.error('FS operation failed:', err.message);
    });

    stream.on('end', () => {
        console.log('\nFile read complete.');
    });
};

await read();
