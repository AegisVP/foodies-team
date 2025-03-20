import { createSlice } from '@reduxjs/toolkit';

// getProfile, getRecipes, getFollowers
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        profile: null,
        recipes: [],
        followers: [],
        isLoading: false,
        error: null,
    },
    extraReducers: () => {},
});

export const usersReducer = usersSlice.reducer;
