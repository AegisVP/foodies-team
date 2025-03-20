import { createSlice } from '@reduxjs/toolkit';

// get my followers, get following, follow, unfollow
const followersSlice = createSlice({
    name: 'followers',
    initialState: {
        followers: [],
        isLoading: false,
        error: null,
    },
    extraReducers: () => {
    },
});

export const followersReducer = followersSlice.reducer;
