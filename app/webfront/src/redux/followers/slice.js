import { createSlice } from '@reduxjs/toolkit';
import { getFollowers } from './operations';

// get my followers,
const followersSlice = createSlice({
    name: 'followers',
    initialState: {
        followers: [],
        page: 1,
        totalPages: 1,
        isLoading: false,
        error: null,
    },
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.followers = action.payload.followers;
                state.totalPages = action.payload.pages;
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

export const {
    setPage,
} = followersSlice.actions;
