import { createSlice } from '@reduxjs/toolkit';

// add getProfile, getRecipes, getFollowers
// unauthorized user with short profile
const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        recipes: [],
        followers: [],
        isLoading: false,
        error: null,
    },
    extraReducers: () => {},
});

export const userReducer = userSlice.reducer;
