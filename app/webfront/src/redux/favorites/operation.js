import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';

import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, GET_FAVORITE_RECIPES } from './constants.js';
import { selectFavoritesLimit } from './selectors';

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
        await api.removeFromFavorites(id);
        return { id };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getFavoriteRecipes = createAsyncThunk(
    GET_FAVORITE_RECIPES,
    async ({ page = 1 }, { rejectWithValue, getState }) => {
        try {
            const queryParams = new URLSearchParams();
            const state = getState();
            const limit = selectFavoritesLimit(state);

            queryParams.append('limit', limit);
            if (page) queryParams.append('page', page);

            const favoriteRecipes = await api.getFavoriteRecipes(queryParams.toString());
            return favoriteRecipes;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
