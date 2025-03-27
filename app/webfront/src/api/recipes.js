import axios from './axiosInstance.js';

export const getRecipes = async queryParams => {
    const recipes = await axios.get(`/recipes?${queryParams}`);
    return recipes;
};

export const addRecipe = async data => {
    const recipe = await axios.post('/recipes', data);
    return recipe;
};

export const deleteRecipe = async id => {
    const recipe = await axios.delete(`/recipes/${id}`);
    return recipe;
};
