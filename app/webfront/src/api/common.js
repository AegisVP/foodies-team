import axios from './axiosInstance';

export const getCategories = async () => {
    const categories = await axios.get('/categories');
    return categories;
};

export const getIngredients = async () => {
    const ingredients = await axios.get('/ingredients');
    return ingredients;
};

export const getAreas = async () => {
    const areas = await axios.get('/areas');
    return areas;
};

export const getTestimonials = async () => {
    const testimonials = await axios.get('/testimonials');
    return testimonials;
};
