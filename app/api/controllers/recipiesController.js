import recipesService from '../services/recipesService.js';
import ingredientsServices from '../services/ingredientsServices.js';

export const getRecipeById = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);

    if (!recipe) {
        const error = new Error('Recipe not found');
        error.status = 404;
        return next(error);
    }

    const ingredients = await ingredientsServices.listIngredients({ id: recipe.ingredients.map((ing) => ing.id) });

    res.json({
        id: recipe.id,
        title: recipe.title,
        category: recipe.category,
        time: recipe.time,
        description: recipe.description,
        owner: recipe.user,
        ingredients: recipe.ingredients.map((ing) => {
            const ingredient = ingredients.find((ing_i) => ing_i.id === ing.id);
            return {
                id: ing.id,
                name: ingredient ? ingredient.name : 'Unknown',
                image: ingredient ? ingredient.image : null,
                measure: ing.measure,
            };
        }),
        area: recipe.area,
        instructions: recipe.instructions,
        thumb: recipe.thumb,
    });
};
