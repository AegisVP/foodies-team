export const file2Base64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
    });
};

export const convertFileToBase64 = async file => {
    if (!file) return '';
    try {
        const base64 = await file2Base64(file);
        return base64;
    } catch (e) {
        console.log('An error occurred during file conversion process', e);
        return '';
    }
};
