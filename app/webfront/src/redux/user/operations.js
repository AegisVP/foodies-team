import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import wrapper from 'src/redux/wrapper';

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (id, { rejectWithValue }) => {
    return await wrapper(api.getUserInformation, rejectWithValue)(id);
});

export const getUserFollowers = createAsyncThunk('user/getUserFollowers', async (id, { rejectWithValue }) => {
    return await wrapper(api.getFollowers, rejectWithValue)(id);
});

export const getUserRecipes = createAsyncThunk('user/getUserRecipes', async (params, { rejectWithValue }) => {
    return await wrapper(api.getRecipes, rejectWithValue)(params);
});
