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
    getFavoriteRecipes,
    getOwnerRecipes,
} from '../controllers/recipesController.js';
import controllerWrapper from '../decorators/controllerWrapper.js';
import upload from '../middlewares/upload.js';

const recipesRouter = express.Router();

recipesRouter.get('/', controllerWrapper(listRecipes));
recipesRouter.post(
    '/',
    authMiddleware,
    upload.single('thumb'),
    validateBody(createRecipeSchema),
    controllerWrapper(createRecipe)
);
recipesRouter.get('/popular', controllerWrapper(getPopularRecipes));
recipesRouter.get('/favorites', authMiddleware, controllerWrapper(getFavoriteRecipes));
recipesRouter.get('/owner/:id', authMiddleware, controllerWrapper(getOwnerRecipes));
recipesRouter.get('/:id', controllerWrapper(getRecipeById));
recipesRouter.delete('/:id', authMiddleware, controllerWrapper(deleteRecipeById));
recipesRouter.post('/:id/favorite', authMiddleware, controllerWrapper(addRecipeToFavorites));
recipesRouter.delete('/:id/favorite', authMiddleware, controllerWrapper(removeFavorite));

export default recipesRouter;
