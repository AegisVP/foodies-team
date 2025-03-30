import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/api';
import wrapper from 'src/redux/wrapper';
import { selectFavoritesLimit } from './selectors';

export const updateUserAvatar = createAsyncThunk(
    'authUser/updateAvatar',
    async (formData, { rejectWithValue }) => await wrapper(api.updateAvatar, rejectWithValue)(formData)
);

export const logoutUserOperation = createAsyncThunk(
    'authUser/logoutUser',
    async (_, { rejectWithValue }) => await wrapper(api.logoutUser, rejectWithValue)()
);

export const loginUserOperation = createAsyncThunk(
    'authUser/loginUser',
    async (credentials, { rejectWithValue }) => await wrapper(api.loginUser, rejectWithValue)(credentials)
);

export const refreshUser = createAsyncThunk(
    'authUser/refreshUser',
    async (_, { rejectWithValue }) => await wrapper(api.getCurrentUser, rejectWithValue)()
);

export const getFollowers = createAsyncThunk(
    'followees/getFollowers',
    async (id, { rejectWithValue }) => await wrapper(api.getFollowers, rejectWithValue)(id)
);

export const getFollowees = createAsyncThunk(
    'followees/getFollowees',
    async (_, { rejectWithValue }) => await wrapper(api.getFollowees, rejectWithValue)()
);

export const followUser = createAsyncThunk('authUser/followUser', async (id, { rejectWithValue, dispatch }) => {
    await wrapper(api.followUser, rejectWithValue)(id);
    dispatch(getFollowees());
    dispatch(getFollowers(id));
});

export const unfollowUser = createAsyncThunk('authUser/unfollowUser', async (id, { rejectWithValue, dispatch }) => {
    console.log('unfollowUser action');
    await wrapper(api.unfollowUser, rejectWithValue)(id);
    dispatch(getFollowees());
    dispatch(getFollowers(id));
});

export const addToFavorites = createAsyncThunk('authUser/addToFavorites', async (id, { rejectWithValue, dispatch }) => {
    const res = await wrapper(api.addToFavorites, rejectWithValue)(id);
    console.log({ res });
    dispatch(getFavoriteRecipes());
});

export const removeFromFavorites = createAsyncThunk(
    'authUser/removeFromFavorites',
    async (id, { rejectWithValue }) => await wrapper(api.removeFromFavorites, rejectWithValue)(id)
);

export const getFavoriteRecipes = createAsyncThunk(
    'authUser/getFavoriteRecipes',
    async ({ page = 1 }, { rejectWithValue, getState }) => {
        const queryParams = new URLSearchParams();
        const state = getState();
        const limit = selectFavoritesLimit(state);
        queryParams.append('limit', limit);

        if (page) queryParams.append('page', page);

        return await wrapper(api.getFavoriteRecipes, rejectWithValue)(queryParams.toString());
    }
);
