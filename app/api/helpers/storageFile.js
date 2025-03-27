import path from 'node:path';
import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

export const saveFile = async (sourceFile, filePrefix) => {
    const avatarsDir = path.resolve('public/avatars');
    const { path: tempPath, filename } = sourceFile;
    const rand = randomUUID();
    const ext = path.extname(filename);
    const newAvatarName = `${filePrefix ? `${filePrefix}-` : ''}${rand}${ext}`;
    const newAvatarPath = path.join(avatarsDir, newAvatarName);

    await fs.rename(tempPath, newAvatarPath);

    return `/avatars/${newAvatarName}`;
};
