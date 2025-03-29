export const convertObjectToFormData = objectData => {
    const formData = new FormData();

    Object.entries(objectData).forEach(([key, value]) => {
        formData.append(key, key === 'ingredients' ? JSON.stringify(value) : value);
    });

    return formData;
};
