import recipesService from '../services/recipesService.js';
import ingredientsServices from '../services/ingredientsServices.js';
import categoriesServices from '../services/categoriesServices.js';
import areasServices from '../services/areasServices.js';
import HttpError from '../helpers/HttpError.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

export const createRecipe = controllerWrapper(async (req, res, next) => {
    const { id: userId } = req.user;
    const { title, category, area, instructions, description, thumb, time, ingredients } = req.body;

    // Verify category exists
    const categoryExists = await categoriesServices.listCategories({ id: category });
    if (!categoryExists || categoryExists.length === 0) {
        return next(HttpError(404, `Category with id ${category} not found`));
    }

    // Verify area exists
    const areaExists = await areasServices.listAreas({ id: area });
    if (!areaExists || areaExists.length === 0) {
        return next(HttpError(404, `Area with id ${area} not found`));
    }

    // Verify all ingredients exist
    // Convert all ingredient IDs to strings to ensure consistency
    const ingredientIds = ingredients.map(ing => String(ing.id));

    // Update ingredients array with string IDs for database storage
    const ingredientsWithStringIds = ingredients.map(ing => ({
        ...ing,
        id: String(ing.id),
    }));
    req.body.ingredients = ingredientsWithStringIds;

    const existingIngredients = await ingredientsServices.listIngredients({ id: ingredientIds });

    if (existingIngredients.length !== ingredientIds.length) {
        const foundIds = existingIngredients.map(ing => ing.id);
        const missingIds = ingredientIds.filter(id => !foundIds.includes(id));
        return next(HttpError(404, `Ingredients with ids ${missingIds.join(', ')} not found`));
    }

    const recipe = await recipesService.createRecipe(req.body, userId);

    const ingredientsWithDetails = ingredientsWithStringIds.map(ing => {
        const ingredientDetails = existingIngredients.find(
            ingDetail => ingDetail.id === ing.id || ingDetail.id === String(ing.id)
        );

        if (!ingredientDetails) {
            console.warn(`Ingredient details not found for ID: ${ing.id}`);
            return {
                id: ing.id,
                name: 'Unknown Ingredient',
                image: null,
                measure: ing.quantity,
            };
        }

        return {
            id: ing.id,
            name: ingredientDetails.name,
            image: ingredientDetails.image,
            measure: ing.quantity,
        };
    });

    res.json({
        id: recipe.id,
        title: recipe.title,
        category: recipe.category_association,
        time: recipe.time,
        description: recipe.description,
        owner: recipe.user,
        ingredients: ingredientsWithDetails,
        area: recipe.area_association,
        instructions: recipe.instructions,
        thumb: recipe.thumb,
    });
});

export const listRecipes = async (req, res) => {
    const limit = parseInt(req.query.limit) || 12;

    const whereCondition = [];

    if (req.query.category) {
        whereCondition.push(`category = '${req.query.category}'`);
    }

    if (req.query.area) {
        whereCondition.push(`area = '${req.query.area}'`);
    }

    const ingredientIds = req.query.ingredients?.split(',').map(id => id.trim()) || [];
    if (ingredientIds.length > 0) {
        whereCondition.push(`ingredients IN (${ingredientIds.join(', ')})`);
    }

    if (req.query.owner) {
        whereCondition.push(`recipes.owner = '${req.query.owner}'`);
    }

    // whereCondition = whereCondition === baseCondition ? null : whereCondition.slice(5 + baseCondition.length);
    console.log({ whereCondition });

    const recipes = await recipesService.listRecipes(whereCondition.join(' AND '));

    const pages = Math.ceil(recipes.length / limit);
    const page = Math.min(pages, parseInt(req.query.page) || 1);
    const startIdx = (page - 1) * limit;
    const endIdx = Math.min(startIdx + limit, recipes.length);

    console.log({ page, limit, startIdx, endIdx });

    res.json({ page, pages, total: recipes.length, recipes: recipes.slice(startIdx, endIdx) });
};

export const getRecipeById = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);

    if (!recipe) {
        throw HttpError(404, 'Recipe not found');
    }

    const ingredients = await ingredientsServices.listIngredients({ id: recipe.ingredients.map(ing => ing.id) });

    res.json({
        id: recipe.id,
        title: recipe.title,
        category: recipe.category_association,
        time: recipe.time,
        description: recipe.description,
        owner: recipe.user,
        ingredients: recipe.ingredients.map(ing => {
            const ingredient = ingredients.find(ing_i => ing_i.id === ing.id);
            return {
                id: ing.id,
                name: ingredient ? ingredient.name : 'Unknown',
                image: ingredient ? ingredient.image : null,
                measure: ing.measure,
            };
        }),
        area: recipe.area_association,
        instructions: recipe.instructions,
        thumb: recipe.thumb,
    });
};

export const addRecipeToFavorites = async (req, res, next) => {
    const { id: userId } = req.user;
    const { recipeId } = req.params;

    await recipesService.addRecipeToFavorites(userId, recipeId);
    return res.status(201).send();
};

export const removeFavorite = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { id: recipeId } = req.body;

        const favorite = await recipesService.deleteFavorite(userId, recipeId);

        if (!favorite) {
            const error = new Error('Favorite not found');
            error.status = 404;
            return next(error);
        }

        await favorite.destroy();

        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        console.error('Remove Favorite Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
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

export const deleteRecipeById = async (req, res, next) => {
    const { id } = req.params;
    // const { id: owner } = req.user;
    const recipe = await recipesService.deleteRecipe({ id }); // TODO pass owner when authMiddleware is ready

    if (!recipe) {
        const error = new Error('Recipe not found');
        error.status = 404;
        return next(error);
    }

    res.json(recipe);
};
