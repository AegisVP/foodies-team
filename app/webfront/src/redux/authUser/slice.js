import { createSlice } from '@reduxjs/toolkit';

// login, logout, getUser, change Avatar, 
const authUserSlice = createSlice({
    name: 'authUser',
    initialState: {
        profile: null,
        isLoading: false,
        error: null,
    },
    extraReducers: () => {}
});

export const authUserReducer = authUserSlice.reducer;