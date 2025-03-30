import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import wrapper from 'src/redux/wrapper';

export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async (id, { rejectWithValue }) => await wrapper(api.getUserInformation, rejectWithValue)(id)
);

export const getUserFollowers = createAsyncThunk(
    'user/getUserFollowers',
    async (id, { rejectWithValue }) => await wrapper(api.getFollowers, rejectWithValue)(id)
);

export const getUserRecipes = createAsyncThunk(
    'user/getUserRecipes',
    async ({ owner, page = 1, category = null, area = null, ingredients = [] }, { rejectWithValue, getState }) => {
        const queryParams = new URLSearchParams();
        const state = getState();
        const limit = state.user?.recipes?.limit;

        queryParams.append('limit', limit);
        if (page) queryParams.append('page', page);
        if (category && category !== 'all') queryParams.append('category', category);
        if (area) queryParams.append('area', area);
        if (ingredients && ingredients.length > 0) queryParams.append('ingredients', ingredients.join(','));
        if (owner) queryParams.append('owner', owner);

        return await wrapper(api.getRecipes, rejectWithValue)(queryParams.toString());
    }
);
