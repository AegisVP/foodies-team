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
    // getOwnerRecipes,       // Розкоментуйте коли реалізуєте
    // getOwnerRecipesById,   // Розкоментуйте коли реалізуєте
} from '../controllers/recipiesController.js';

const recipiesRouter = express.Router();

// Публічні маршрути (без аутентифікації)
recipiesRouter.get('/', listRecipes);
recipiesRouter.get('/popular', getPopularRecipes);

// Необхідна аутентифікація для наступних маршрутів
recipiesRouter.use(authMiddleware);

// 1. Специфічні маршрути без параметрів
recipiesRouter.get('/favorite', getFavoriteRecipes);
// recipiesRouter.get('/owner', getOwnerRecipes);  // Маршрут для отримання власних рецептів

// 2. Специфічні маршрути з параметрами
recipiesRouter.post('/favorite/:recipeId', addRecipeToFavorites);
recipiesRouter.delete('/favorite/:recipeId', removeFavorite);
// recipiesRouter.get('/owner/:id', getOwnerRecipesById);  // Маршрут для отримання рецептів конкретного користувача

// 3. Загальні маршрути з параметрами
recipiesRouter.get('/:id', getRecipeById);

// 4. POST/PUT запити
recipiesRouter.post('/', validateBody(createRecipeSchema), createRecipe);

recipiesRouter.post('/favorite/:recipeId', addRecipeToFavorites);
recipiesRouter.delete('/favorite', removeFavorite);
recipiesRouter.post('/', validateBody(createRecipeSchema), createRecipe); // create recipe
recipiesRouter.delete('/:id', deleteRecipeById);

// recipiesRouter.get('/owner', recipesController); // мої рецепти
// recipiesRouter.get('/owner/:id', recipesController); // рецепти користувача

// recipiesRouter.get('/favorite', recipesController); // мої обрані

export default recipiesRouter;
