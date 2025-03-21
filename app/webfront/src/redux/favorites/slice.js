import { createSlice } from '@reduxjs/toolkit';

//  get my favorites, add, delete
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
        isLoading: false,
        error: null,
    },
    extraReducers: () => {},
});

export const favoritesReducer = favoritesSlice.reducer;
