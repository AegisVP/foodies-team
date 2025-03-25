import { createSlice } from '@reduxjs/toolkit';
import { getFollowers, getFollowees } from './operations.js';

// add getProfile, getRecipes, getFollowers
// unauthorized user with short profile
const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        recipes: [],
        followers: [],
        folowees: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(getFollowees.fulfilled, (state, action) => {
                state.folowees = action.payload;
            })
    },
});

export const userReducer = userSlice.reducer;
