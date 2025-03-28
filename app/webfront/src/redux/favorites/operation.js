import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';

import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, GET_FAVORITE_RECIPES } from './constants.js';

export const addToFavorites = createAsyncThunk(ADD_TO_FAVORITES, async (id, { rejectWithValue }) => {
    try {
        const recipe = await api.addToFavorites(id);
        return recipe;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const removeFromFavorites = createAsyncThunk(REMOVE_FROM_FAVORITES, async (id, { rejectWithValue }) => {
    try {
        const recipe = await api.removeFromFavorites(id);
        return recipe;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getFavoriteRecipes = createAsyncThunk(GET_FAVORITE_RECIPES, async (id, { rejectWithValue }) => {
    try {
        const favorites = await api.getFavoriteRecipes();
        return favorites;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
