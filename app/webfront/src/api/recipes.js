import axiosPrivate from './axiosPrivate.js';

export const getRecipes = async () => {
    const recipes = await axiosPrivate.get('/recipes');
    return recipes;
};

export const addRecipe = async (data) => {
    const recipe = await axiosPrivate.post('/recipes', data);
    return recipe;
};

export const deleteRecipe = async (id) => {
    const recipe = await axiosPrivate.delete(`/recipes/${id}`);
    return recipe;
};
