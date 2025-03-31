import { createSlice } from '@reduxjs/toolkit';
import {
    logoutUserOperation,
    updateUserAvatar,
    loginUserOperation,
    refreshUser,
    getFollowers,
    getFollowees,
    getFavoriteRecipes,
    removeFavorite,
} from './operations';

const token = localStorage.getItem('token');

const initialState = {
    isAuthenticated: token !== null && token !== undefined,
    token: token || null,
    user: null,
    favorites: {
        page: 0,
        limit: 0,
        pages: 0,
        total: 0,
        recipes: [],
    },
    recipes: {
        page: 0,
        limit: 0,
        pages: 0,
        total: 0,
        recipes: [],
    },
    followees: {
        page: 0,
        limit: 0,
        pages: 0,
        total: 0,
        followees: [],
    },
    followers: {
        page: 0,
        limit: 0,
        pages: 0,
        total: 0,
        followers: [],
    },
    isLoading: false,
    error: null,
};

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.favorites.recipes.filter(recipe => recipe.id !== action.meta.arg);
            })
            .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
                state.favorites = action.payload;
            })
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(getFollowees.fulfilled, (state, action) => {
                state.followees = action.payload;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(refreshUser.rejected, state => {
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                localStorage.removeItem('token');
            })
            .addCase(loginUserOperation.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(logoutUserOperation.fulfilled, state => {
                localStorage.removeItem('token');
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.user.avatar = action.payload.avatar;
            })
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/pending'),
                state => {
                    state.error = null;
                    state.isLoading = true;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/fulfilled'),
                state => {
                    state.isLoading = false;
                }
            );
    },
});

export const authUserReducer = authUserSlice.reducer;
