import recipesService from '../services/recipesService.js';

export const getRecipeById = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);

    if (!recipe) {
        const error = new Error('Recipe not found');
        error.status = 404;
        return next(error);
    }

    res.json(recipe);
};
