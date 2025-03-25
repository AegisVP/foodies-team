import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import { routes } from './constants.js';

export const getFollowers = createAsyncThunk(routes.GET_FOLLOWERS, async (id, { rejectWithValue }) => {
    try {
        const followers = await api.getFollowers(id);
        return followers;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getFollowees = createAsyncThunk(routes.GET_FOLLOWEES, async (id, { rejectWithValue }) => {
    try {
        const followers = await api.getFollowees(id);
        return followers;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
