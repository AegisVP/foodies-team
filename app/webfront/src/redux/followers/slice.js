import { createSlice } from '@reduxjs/toolkit';
import { getFollowers } from './operations';

// get my followers,
const followersSlice = createSlice({
    name: 'followers',
    initialState: {
        followers: [],
        isLoading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.followers = action.payload.followers;
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

export const followersReducer = followersSlice.reducer;
