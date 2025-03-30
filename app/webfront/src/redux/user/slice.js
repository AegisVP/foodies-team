import { createSlice } from '@reduxjs/toolkit';
import { getUserFollowers, getUserProfile, getUserRecipes } from './operations.js';

const setUserProfile = (state, action) => {
    state.profile = action.payload;
};

const initialState = {
    profile: null,
    recipes: {
        page: 0,
        limit: 0,
        pages: 0,
        total: 0,
        recipes: [],
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

// add getProfile, getRecipes, getFollowers
// unauthorized user with short profile
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setProfile: setUserProfile,
    },
    extraReducers: builder => {
        builder
            .addCase(getUserRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload;
            })
            .addCase(getUserFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(getUserProfile.fulfilled, setUserProfile)
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

export const { setProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
