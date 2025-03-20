import { createSelector } from '@reduxjs/toolkit';

export const selectRecipes = (state) => state.recipes.recipes;
export const selectIsRecipesLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;

// TODO revise if these two selectors are needed
export const selectRecipeDetails = (state) => state.recipes.recipeDetails;

export const selectRecipeById = createSelector(
    [selectRecipes],
    (recipes) => (id) => recipes.find((recipe) => recipe.id === id)
);
