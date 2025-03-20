import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import { FETCH_CATEGORIES } from './constants.js';

export const getCategories = createAsyncThunk(FETCH_CATEGORIES, async (_, { rejectWithValue }) => {
    try {
        const categories = await api.getCategories();

        return categories;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
