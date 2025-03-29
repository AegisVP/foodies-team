import { createSelector } from '@reduxjs/toolkit';

export const selectFavorites = state => state.favorites.favorites;
export const selectFavoritesPage = state => state.favorites.page;
export const selectFavoritesTotalPages = state => state.favorites.totalPages;
export const selectFavoritesLimit = state => state.favorites.limit;
export const selectIsFavoritesLoading = state => state.favorites.isLoading;
export const selectFavoritesError = state => state.favorites.error;

export const selectFavoriteRecipesId = createSelector(
    [selectFavorites],
    favorites => favorites?.map(favorite => favorite.id) || []
);
