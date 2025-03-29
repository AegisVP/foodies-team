import { createSelector } from '@reduxjs/toolkit';

export const selectRecipes = state => state.recipes.recipes;
export const selectPage = state => state.recipes.page;
export const selectLimit = state => state.recipes.limit;
export const selectTotalPages = state => state.recipes.totalPages;
export const selectIsRecipesLoading = state => state.recipes.isLoading;
export const selectRecipesError = state => state.recipes.error;
export const selectIsRecipesSuccessful = state => state.recipes.isSuccessful;

export const selectRecipeDetails = state => state.recipes.recipeDetails;
export const selectRecipeThumb = state => state.recipes.recipeDetails.thumb;
export const selectRecipeCategory = state => state.recipes.recipeDetails.category;
export const selectRecipeArea = state => state.recipes.recipeDetails.area;
export const selectCurrentIngredient = state => state.recipes.recipeDetails.currentIngredient;
export const selectRecipeIngredients = state => state.recipes.recipeDetails.ingredients;

export const selectRecipeById = createSelector(
    [selectRecipes],
    recipes => id => recipes.find(recipe => recipe.id === id)
);
