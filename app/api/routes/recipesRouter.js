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

recipiesRouter.use(authMiddleware);

recipiesRouter.post('/favorite/:recipeId', addRecipeToFavorites);
recipiesRouter.delete('/favorite', removeFavorite);
recipiesRouter.post('/', validateBody(createRecipeSchema), createRecipe); // create recipe
recipiesRouter.delete('/:id', deleteRecipeById);

// recipiesRouter.get('/owner', recipesController); // мої рецепти
// recipiesRouter.get('/owner/:id', recipesController); // рецепти користувача

// recipiesRouter.get('/favorite', recipesController); // мої обрані

export default recipiesRouter;
