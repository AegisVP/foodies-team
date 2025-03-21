import express from 'express';
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  listRecipes,
  getRecipeById,
  getPopularRecipes,
  deleteRecipeById,
  removeFavorite
} from '../controllers/recipiesController.js';

const recipiesRouter = express.Router();

recipiesRouter.get('/', listRecipes);
recipiesRouter.get('/popular', getPopularRecipes);
recipiesRouter.get('/:id', getRecipeById);
recipiesRouter.delete('/:id', deleteRecipeById);

recipiesRouter.use(authMiddleware);

// recipiesRouter.post('/', recipesController); // create recipe

// recipiesRouter.get('/owner', recipesController); // мої рецепти
// recipiesRouter.get('/owner/:id', recipesController); // рецепти користувача

// recipiesRouter.get('/favorite', recipesController); // мої обрані
// recipiesRouter.post('/favorite', recipesController); // додати в обрані
recipiesRouter.delete('/favorite', removeFavorite);

export default recipiesRouter;
