import { createSlice } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites, getFavoriteRecipes } from './operation';

//  get my favorites, add, delete
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
        page: 1,
        totalPages: 1,
        limit: 8,
        isLoading: false,
        error: null,
    },
    reducers: {
        setFavoritePage(state, action) {
            state.page = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
                state.favorites = action.payload.recipes;
                state.page = action.payload.page;
                state.totalPages = action.payload.pages;
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
                    state.favorites = state.favorites.filter(recipe => recipe.id !== action.payload.id);
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

export const { setFavoritePage } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
