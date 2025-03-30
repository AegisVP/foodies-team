import { createSelector } from '@reduxjs/toolkit';

export const selectAuthUserError = state => state.authUser.error;
export const selectAuthUserIsLoading = state => state.authUser.isLoading;
export const selectAuthUser = state => state.authUser.user;
export const selectAuthToken = state => state.authUser.token;
export const selectIsAuthenticated = state => state.authUser.isAuthenticated;
export const selectAuthUserId = state => state.authUser.user?.id;
export const selectAuthUserFollowees = state => state.authUser.followees;
export const selectAuthUserFollowers = state => state.authUser.followers;
export const selectAuthUserRecipes = state => state.authUser.recipes;

export const selectFavorites = state => state.authUser.favorites;
export const selectFavoritesPage = state => state.authUser.favorites.page;
export const selectFavoritesTotalPages = state => state.authUser.favorites.pages;
export const selectFavoritesLimit = state => state.authUser.favorites.limit;
export const selectIsFavoritesLoading = state => state.authUser.isLoading;
export const selectFavoritesError = state => state.authUser.error;

export const selectFavoriteRecipesId = createSelector(
    [selectFavorites],
    favorites => favorites?.map(({ id }) => id) || []
);
