import { createSlice } from '@reduxjs/toolkit';

//  get my following, follow, unfollow
const followeesSlice = createSlice({
    name: 'followees',
    initialState: {
        following: [],
        isLoading: false,
        error: null,
    },
    extraReducers: () => {},
});

export const followeesReducer = followeesSlice.reducer;
