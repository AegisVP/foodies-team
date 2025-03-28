import 'dotenv/config';
// import path from 'node:path';
import { v2 as cloudinary } from 'cloudinary';

export const saveFile = async (sourceFile, additionalUploadOptions = {}) => {
    const { path: tempPath, filename } = sourceFile;
    // const ext = path.extname(filename);
    // const name = filename.replace(ext, '');

    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });

    // // Upload an image
    const uploadResult = await cloudinary.uploader.upload(tempPath, {
        asset_folder: 'foodies',
        ...additionalUploadOptions,
    });

    return uploadResult.secure_url;
};
