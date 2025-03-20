import axiosPublic from './axiosPublic.js';

export const getCategories = async () => {
    const categories = await axiosPublic.get('/categories');
    return categories;
};
