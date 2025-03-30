import { createSlice } from '@reduxjs/toolkit';
import { getFollowees } from './operations';

//  get my following, follow, unfollow
const followeesSlice = createSlice({
    name: 'followees',
    initialState: {
        following: [],
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
            .addCase(getFollowees.fulfilled, (state, action) => {
                state.followees = action.payload.followees;
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

export const followeesReducer = followeesSlice.reducer;

export const {
    setPage,
} = followeesSlice.actions;
