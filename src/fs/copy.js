import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const srcDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    try {
        await fs.access(destDir);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            try {
                await fs.access(srcDir);

                await fs.cp(srcDir, destDir, { recursive: true });
            } catch (err) {
                throw new Error('FS operation failed');
            }
        } else {
            throw err;
        }
    }
};

await copy();