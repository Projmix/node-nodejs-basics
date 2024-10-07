import { createReadStream, createWriteStream } from 'fs';
import path, { join } from 'path';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';


const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const inputFile = join(__dirname, 'files', 'fileToCompress.txt');
    const outputFile = join(__dirname, 'files', 'archive.gz');

    const readStream = createReadStream(inputFile);
    const writeStream = createWriteStream(outputFile);
    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File successfully compressed.');
    });

    writeStream.on('error', (err) => {
        console.error('Compression failed', err);
    });
};

await compress();