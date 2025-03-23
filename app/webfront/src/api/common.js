import axios from './axiosInstance';

export const getCategories = async () => {
    const categories = await axios.get('/categories');
    return categories;
};

export const getTestimonials = async () => {
    const testimonials = await axios.get('/testimonials');
    return testimonials;
};
