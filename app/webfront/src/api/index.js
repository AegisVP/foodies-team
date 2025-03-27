import { loginUser } from './auth';
import { getRecipes, addRecipe, deleteRecipe, getRecipeById, addToFavorites, removeFromFavorites, getFavoriteRecipes } from './recipes';
import { getCategories, getIngredients, getAreas, getTestimonials } from './common';

// TODO add all api methods here for reexport
export default {
    //auth
    loginUser,
    //recipes
    getRecipes,
    addRecipe,
    deleteRecipe,
    getRecipeById,
    addToFavorites,
    removeFromFavorites,
    getFavoriteRecipes,
    //common
    getCategories,
    getIngredients,
    getAreas,
    getTestimonials,
};
