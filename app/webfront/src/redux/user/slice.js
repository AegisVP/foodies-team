import { createSlice } from '@reduxjs/toolkit';
import { followUser, unfollowUser, getUserProfile } from './operations.js';

const initialState = {
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
    extraReducers: builder => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(followUser.fulfilled, (state, action) => {
                state.followers.followers.find(follower => follower.id === action.payload).isFollowing = true;
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                state.followees.followees.find(followee => followee.id === action.payload).isFollowing = false;
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

export const { setProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
