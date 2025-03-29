import { createSlice } from '@reduxjs/toolkit';
import { getFollowees } from './operations';

//  get my following, follow, unfollow
const followeesSlice = createSlice({
    name: 'followees',
    initialState: {
        following: [],
        isLoading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(getFollowees.fulfilled, (state, action) => {
                state.followees = action.payload.followees;
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

export const followeesReducer = followeesSlice.reducer;
