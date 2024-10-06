import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');
    try {
        await fs.access(oldPath);
        await fs.access(newPath);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.rename(oldPath, newPath);
        } else {
            throw err;
        }
    }
};

await rename();