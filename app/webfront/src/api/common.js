import axios from './axiosInstance';

export const getCategories = async () => {
    const categories = await axios.get('/categories');
    return categories;
};
