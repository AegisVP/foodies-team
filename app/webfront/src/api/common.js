import axios from './axiosInstance';

export const getCategories = async () => await axios.get('/categories');

export const getIngredients = async () => await axios.get('/ingredients');

export const getAreas = async () => await axios.get('/areas');

export const getTestimonials = async () => await axios.get('/testimonials');
