import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import { FETCH_CATEGORIES, FETCH_INGREDIENTS, FETCH_AREAS, FETCH_TESTIMONIALS } from './constants.js';

export const getCategories = createAsyncThunk(FETCH_CATEGORIES, async (_, { rejectWithValue }) => {
    try {
        const categories = await api.getCategories();

        return categories;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getIngredients = createAsyncThunk(FETCH_INGREDIENTS, async (_, { rejectWithValue }) => {
    try {
        const ingredients = await api.getIngredients();

        return ingredients;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getAreas = createAsyncThunk(FETCH_AREAS, async (_, { rejectWithValue }) => {
    try {
        const areas = await api.getAreas();

        return areas;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getTestimonials = createAsyncThunk(FETCH_TESTIMONIALS, async (_, { rejectWithValue }) => {
    try {
        const testimonials = await api.getTestimonials();

        return testimonials;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
