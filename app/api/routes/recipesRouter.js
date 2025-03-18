import express from 'express';
import { getRecipeById } from '../controllers/recipiesController.js';

const recipiesRouter = express.Router();

recipiesRouter.get('/:id', getRecipeById);

// recipiesRouter.get('/popular', recipesController); // популярні рецепти

// recipiesRouter.use(authMiddleware);

// recipiesRouter.post('/', recipesController); // create recipe
// recipiesRouter.delete('/', recipesController); // delete recipe

// recipiesRouter.get('/owner', recipesController); // мої рецепти
// recipiesRouter.get('/owner/:id', recipesController); // рецепти користувача

// recipiesRouter.get('/favorite', recipesController); // мої обрані
// recipiesRouter.post('/favorite', recipesController); // додати в обрані
// recipiesRouter.delete('/favorite', recipesController); // видалити з обраних

export default recipiesRouter;
