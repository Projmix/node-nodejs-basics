import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    
    try {
        await fs.access(filePath);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(filePath, 'I am fresh and young', 'utf8');
            console.log('File created successfully.');
        } else {
            throw err;
        }
    }
};

await create();
