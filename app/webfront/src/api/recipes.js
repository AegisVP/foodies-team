import axios from './axiosInstance.js';

export const getRecipes = async queryParams => {
    const recipes = await axios.get(`/recipes?${queryParams}`);
    return recipes;
};

export const getOwnerRecipes = async (userId, queryParams) => {
    const recipes = await axios.get(`/recipes/owner/${userId}?${queryParams}`);
    return recipes;
};

export const addRecipe = async data => {
    const recipe = await axios.post('/recipes', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return recipe;
};

export const deleteRecipe = async id => {
    const recipe = await axios.delete(`/recipes/${id}`);
    return recipe;
};
