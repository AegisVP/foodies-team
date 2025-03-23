import { loginUser } from './auth';
import { getRecipes, addRecipe, deleteRecipe } from './recipes';
import { getCategories, getTestimonials } from './common';

// TODO add all api methods here for reexport
export default {
    //auth
    loginUser,
    //recipes
    getRecipes,
    addRecipe,
    deleteRecipe,
    //common
    getCategories,
    getTestimonials,
};
