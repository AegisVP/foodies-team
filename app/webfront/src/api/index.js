import { login } from './auth';
import { getRecipes, addRecipe, deleteRecipe } from './recipes';
import { getCategories } from './common';

// TODO add all api methods here for reexport
export default {
    //auth
    login,
    //recipes
    getRecipes,
    addRecipe,
    deleteRecipe,
    //common
    getCategories,
};
