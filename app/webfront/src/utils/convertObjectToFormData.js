export const convertObjectToFormData = objectData => {
    const formData = new FormData();

    Object.entries(objectData).forEach(([key, value]) => {
        formData.append(key, JSON.stringify(value));
    });

    return formData;
};
