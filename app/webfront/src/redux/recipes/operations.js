import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import { selectLimit } from './selectors';
import { FETCH_RECIPES, ADD_RECIPE, DELETE_RECIPE } from './constants.js';

export const fetchRecipes = createAsyncThunk(
    FETCH_RECIPES,
    async ({ page = 1, category = null, area = null, ingredients = [] }, { rejectWithValue, getState }) => {
        try {
            const queryParams = new URLSearchParams();
            const state = getState();
            const limit = selectLimit(state);

            queryParams.append('limit', limit);
            if (page) queryParams.append('page', page);
            if (category && category !== 'all') queryParams.append('category', category);
            if (area) queryParams.append('area', area);
            if (ingredients && ingredients.length > 0) queryParams.append('ingredients', ingredients.join(','));

            const recipes = await api.getRecipes(queryParams.toString());

            return recipes;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addRecipe = createAsyncThunk(ADD_RECIPE, async (recipe, { rejectWithValue }) => {
    try {
        const addedRecipe = await api.addRecipe(recipe);
        return addedRecipe;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteRecipe = createAsyncThunk(DELETE_RECIPE, async (id, { rejectWithValue }) => {
    try {
        const deletedRecipe = await api.deleteRecipe(id);
        return deletedRecipe;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
