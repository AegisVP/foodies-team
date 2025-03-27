import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: null,
    recipes: [],
    followers: [],
    isLoading: false,
    error: null,
};

// add getProfile, getRecipes, getFollowers
// unauthorized user with short profile
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setProfile: (_, { payload }) => {
            return payload;
        },
    },
});

export const { setProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
