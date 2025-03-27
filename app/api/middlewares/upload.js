import multer from 'multer';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const tempDir = path.resolve('temp');

const storage = multer.diskStorage({
    tempDir,
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${req.user.id}-${randomUUID()}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
});

export default upload;
