import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import { selectLimit } from './selectors';
import { FETCH_RECIPES, FETCH_OWNER_RECIPES, ADD_RECIPE, DELETE_RECIPE, GET_RECIPE_BY_ID } from './constants.js';
import { selectAuthUserId } from 'src/redux/authUser/selectors';

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

export const fetchOwnerRecipes = createAsyncThunk(
    FETCH_OWNER_RECIPES,
    async ({ page = 1 }, { rejectWithValue, getState }) => {
        try {
            const queryParams = new URLSearchParams();
            const state = getState();
            const limit = selectLimit(state);
            const userId = selectAuthUserId(state);

            if (!userId) {
                return rejectWithValue('User ID not found');
            }

            queryParams.append('limit', limit);
            if (page) queryParams.append('page', page);

            const recipes = await api.getOwnerRecipes(userId, queryParams.toString());

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

export const getRecipeById = createAsyncThunk(GET_RECIPE_BY_ID, async (id, { rejectWithValue }) => {
    try {
        const recipe = await api.getRecipeById(id);
        return recipe;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
