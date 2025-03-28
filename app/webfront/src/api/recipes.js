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
    const recipe = await axios.post('/recipes', data);
    return recipe;
};

export const deleteRecipe  = async id => {
    const recipe = await axios.delete(`/recipes/${id}`);
    return recipe;
};

export const getRecipeById = async id => {
    const recipe = await axios.get(`/recipes/${id}`);
    return recipe;
};

export const addToFavorites = async id => {
    console.log('addToFavorites', id);
    const recipe = await axios.post(`/recipes/${id}/favorite`);
    return recipe;
};

export const removeFromFavorites = async id => {
    const recipe = await axios.delete(`/recipes/${id}/favorite`);
    return recipe;
};

export const getFavoriteRecipes = async () => {
    const recipes = await axios.get(`/recipes/favorites`);
    console.log(("   "))
    return recipes;
};
