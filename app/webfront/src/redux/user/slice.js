import { createSlice } from '@reduxjs/toolkit';
import { getFollowers, getFollowees } from './operations.js';

// add getProfile, getRecipes, getFollowers
// unauthorized user with short profile
const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        recipes: [],
        followers: {
            page: 0,
            pages: 0,
            total: 0,
            followers: [],
        },
        followees: {
            page: 0,
            pages: 0,
            total: 0,
            followees: [],
        },
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(getFollowees.fulfilled, (state, action) => {
                state.followees = action.payload;
            })
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/pending'),
                state => {
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

export const userReducer = userSlice.reducer;
