import { createSlice } from '@reduxjs/toolkit';

//  get my following, follow, unfollow
const followingSlice = createSlice({
    name: 'following',
    initialState: {
        following: [],
        isLoading: false,
        error: null,
    },
    extraReducers: () => {},
});

export const followingReducer = followingSlice.reducer;
