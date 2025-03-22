import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateBody } from '../decorators/validateBody.js';
import { createRecipeSchema } from '../schemas/recipesSchema.js';
import {
    createRecipe,
    listRecipes,
    getRecipeById,
    getPopularRecipes,
    deleteRecipeById,
    addRecipeToFavorites,
    removeFavorite,
} from '../controllers/recipiesController.js';

const recipiesRouter = express.Router();

recipiesRouter.get('/', listRecipes);
recipiesRouter.get('/popular', getPopularRecipes);
recipiesRouter.get('/:id', getRecipeById);
recipiesRouter.delete('/:id', deleteRecipeById);

recipiesRouter.use(authMiddleware);

recipiesRouter.post('/', validateBody(createRecipeSchema), createRecipe); // create recipe

// recipiesRouter.get('/owner', recipesController); // мої рецепти
// recipiesRouter.get('/owner/:id', recipesController); // рецепти користувача

// recipiesRouter.get('/favorite', recipesController); // мої обрані
recipiesRouter.post('/favorite/:recipeId', addRecipeToFavorites);
recipiesRouter.delete('/favorite', removeFavorite);

export default recipiesRouter;
