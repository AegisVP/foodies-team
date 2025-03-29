import { createSelector } from '@reduxjs/toolkit';

export const selectFavorites = (state) => state.favorites.favorites;
export const selectIsFavoritesLoading = (state) => state.favorites.isLoading;
export const selectFavoritesError = (state) => state.favorites.error;

export const selectFavoriteRecipesId = createSelector(
    [selectFavorites],
    (favorites) => favorites?.map((favorite) => favorite.id) || [] 
);
