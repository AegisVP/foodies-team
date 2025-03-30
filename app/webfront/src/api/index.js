import { loginUser, registerUser, logoutUser, getCurrentUser, updateAvatar } from './auth';
import {
    getRecipes,
    getOwnerRecipes,
    addRecipe,
    deleteRecipe,
    getRecipeById,
    addToFavorites,
    removeFromFavorites,
    getFavoriteRecipes,
} from './recipes';
import { getCategories, getIngredients, getAreas, getTestimonials } from './common';
import {
    getUserInformation,
    getUserFavoriteRecipes,
    getFollowers,
    getFollowees,
    followUser,
    unfollowUser,
} from './user';

// TODO add all api methods here for reexport
export default {
    //auth
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser,
    updateAvatar,
    getFollowees,
    followUser,
    unfollowUser,
    //recipes
    getRecipes,
    getOwnerRecipes,
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
    //user
    getUserInformation,
    getUserFavoriteRecipes,
    getFollowers,
};
