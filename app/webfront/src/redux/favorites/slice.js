import { createSlice } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites, getFavoriteRecipes } from './operation';

//  get my favorites, add, delete
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
        isLoading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
                state.favorites = action.payload.recipes;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                const index = state.favorites.findIndex(recipe => recipe.id === action.payload.id);
                if (index !== -1) {
                    state.recipes[index].isFavorite = true;
                }
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                const index = state.favorites.findIndex(recipe => recipe.id === action.payload.id);
                if (index !== -1) {
                    state.recipes[index].isFavorite = false;
                }
            })
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                    state.isLoading = false;
                }
            )
            .addMatcher(
                action => action.type.endsWith('/pending'),
                state => {
                    state.error = null;
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

export const favoritesReducer = favoritesSlice.reducer;
