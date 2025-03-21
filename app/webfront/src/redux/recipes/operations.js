import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import { FETCH_RECIPES, ADD_RECIPE, DELETE_RECIPE } from './constants.js';

export const fetchRecipes = createAsyncThunk(FETCH_RECIPES, async (_, { rejectWithValue }) => {
    try {
        const recipes = await api.getRecipes();
        return recipes;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

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