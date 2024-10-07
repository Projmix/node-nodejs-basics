import { createReadStream, createWriteStream } from 'fs';
import path, { join } from 'path';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';


const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const inputFile = join(__dirname, 'files', 'archive.gz');
    const outputFile = join(__dirname, 'files', 'fileToCompress.txt');

    const readStream = createReadStream(inputFile);
    const writeStream = createWriteStream(outputFile);
    const gunzip = createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File successfully decompressed.');
    });

    writeStream.on('error', (err) => {
        console.error('Decompression failed', err);
    });
};

await decompress();