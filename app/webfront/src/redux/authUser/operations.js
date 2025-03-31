import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api';
import wrapper from 'src/redux/wrapper';
import { getUserFollowers } from '../user/operations';

export const updateUserAvatar = createAsyncThunk('authUser/updateAvatar', async (formData, { rejectWithValue }) => {
    return await wrapper(api.updateAvatar, rejectWithValue)(formData);
});

export const logoutUserOperation = createAsyncThunk('authUser/logoutUser', async (_, { rejectWithValue }) => {
    return await wrapper(api.logoutUser, rejectWithValue)();
});

export const loginUserOperation = createAsyncThunk('authUser/loginUser', async (credentials, { rejectWithValue }) => {
    return await wrapper(api.loginUser, rejectWithValue)(credentials);
});

export const refreshUser = createAsyncThunk('authUser/refreshUser', async (_, { rejectWithValue }) => {
    return await wrapper(api.getCurrentUser, rejectWithValue)();
});

export const getFollowers = createAsyncThunk('authUser/getFollowers', async (id, { rejectWithValue }) => {
    return await wrapper(api.getFollowers, rejectWithValue)(id);
});

export const getFollowees = createAsyncThunk('authUser/getFollowees', async (_, { rejectWithValue }) => {
    return await wrapper(api.getFollowees, rejectWithValue)();
});

export const followUser = createAsyncThunk('authUser/followUser', async (id, { rejectWithValue, dispatch }) => {
    await wrapper(api.followUser, rejectWithValue)(id);
    dispatch(getFollowees());
    dispatch(getUserFollowers(id));
});

export const unfollowUser = createAsyncThunk('authUser/unfollowUser', async (id, { rejectWithValue, dispatch }) => {
    await wrapper(api.unfollowUser, rejectWithValue)(id);
    dispatch(getFollowees());
    dispatch(getUserFollowers(id));
});

export const addToFavorites = createAsyncThunk('authUser/addToFavorites', async (id, { rejectWithValue, dispatch }) => {
    await wrapper(api.addToFavorites, rejectWithValue)(id);
    dispatch(getFavoriteRecipes());
});

export const removeFromFavorites = createAsyncThunk('authUser/removeFromFavorites', async (id, { rejectWithValue }) => {
    return await wrapper(api.removeFromFavorites, rejectWithValue)(id);
});

export const getFavoriteRecipes = createAsyncThunk(
    'authUser/getFavoriteRecipes',
    async (params, { rejectWithValue }) => await wrapper(api.getFavoriteRecipes, rejectWithValue)(params)
);
