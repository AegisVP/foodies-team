import axios, { HEADER_MFD } from './axiosInstance.js';

export const getRecipes = async params => await axios.get('/recipes', { params });

export const getOwnerRecipes = async (userId, query) => await axios.get(`/recipes/owner/${userId}?${query}`);

export const addRecipe = async data => await axios.post('/recipes', data, { headers: HEADER_MFD });

export const deleteRecipe = async id => await axios.delete(`/recipes/${id}`);

export const getRecipeById = async id => await axios.get(`/recipes/${id}`);

export const addToFavorites = async id => await axios.post(`/recipes/${id}/favorite`);

export const removeFromFavorites = async id => await axios.delete(`/recipes/${id}/favorite`);

export const getFavoriteRecipes = async params => await axios.get('/recipes/favorites', { params });

export const getPopularRecipes = async () => await axios.get('/recipes/popular');
