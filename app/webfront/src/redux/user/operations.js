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
        const followees = await api.getFollowees(id);
        return followees;
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
