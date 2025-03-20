import recipesService from '../services/recipesService.js';
import ingredientsServices from '../services/ingredientsServices.js';

export const listRecipes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    let whereCondition = '1=1';

    if (req.query.category) {
        whereCondition += ` AND category = '${req.query.category}'`;
    }

    if (req.query.area) {
        whereCondition += ` AND area = '${req.query.area}'`;
    }

    if (req.query.ingredients) {
        const ingredientIds = req.query.ingredients.split(',').map((id) => id.trim());
        whereCondition += ` AND ${ingredientIds
            .map((id) => `CAST(ingredients AS TEXT) SIMILAR TO '%"id":[ ]?"${id}"%'`)
            .join(' AND ')}`;
    }

    res.json(await recipesService.listRecipes(limit, page, whereCondition));
};

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

export const removeFavorite = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { recipeId } = req.params;

        const favorite = await deleteFavorite(userId, recipeId);

        if (!favorite) {
            const error = new Error('Favorite not found');
            error.status = 404;
            return next(error);
        }

        await favorite.destroy();

        res.status(200).json({ message: "Favorite removed successfully" });
    } catch (error) {
        console.error("Remove Favorite Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getPopularRecipes = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const popularRecipes = await recipesService.getPopularRecipes(limit, page);

        res.json({
            page,
            limit,
            data: popularRecipes,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

