import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api/index.js';
import { routes } from './constants.js';

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (id, { rejectWithValue }) => {
    try {
        const profile = await api.getUserInformation(id);
        return profile;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const followUser = createAsyncThunk(routes.FOLLOW_USER, async (id, { rejectWithValue }) => {
    try {
        await api.followUser(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const unfollowUser = createAsyncThunk(routes.UNFOLLOW_USER, async (id, { rejectWithValue }) => {
    try {
        await api.unfollowUser(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
