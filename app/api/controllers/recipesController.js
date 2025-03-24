import recipesService from '../services/recipesService.js';
import ingredientsServices from '../services/ingredientsServices.js';
import categoriesServices from '../services/categoriesServices.js';
import areasServices from '../services/areasServices.js';
import HttpError from '../helpers/HttpError.js';
import usersService from '../services/usersService.js';

const paginateRecipes = (sentPage = 1, limit = 12, recipes) => {
    const pages = Math.ceil(recipes.length / limit);
    const page = Math.min(pages, sentPage);
    const startIdx = (page - 1) * limit;
    const endIdx = Math.min(startIdx + limit, recipes.length);

    return { page, pages, total: recipes.length, recipes: recipes.slice(startIdx, endIdx) };
};

const populateIngredients = (ingIds, ingData) =>
    ingIds.map(({ id, measure }) => {
        const ingredientDetails = ingData.find(ing => id === ing.id);
        const name = ingredientDetails ? ingredientDetails.name : 'Unknown';
        const image = ingredientDetails ? ingredientDetails.image : null;

        return { id, name, image, measure };
    });

export const listRecipes = async (req, res) => {
    const whereCondition = [];

    if (req.query.category) {
        whereCondition.push(`"category" = '${req.query.category}'`);
    }

    if (req.query.area) {
        whereCondition.push(`"area" = '${req.query.area}'`);
    }

    if (req.query.ingredients) {
        const ingredientIds =
            req.query.ingredients
                .split(',')
                .map(id => id.trim())
                .filter(id => id !== '') || [];
        whereCondition.push(
            `${ingredientIds.map(id => `CAST(ingredients AS TEXT) SIMILAR TO '%"id":[ ]?"${id}"%'`).join(' AND ')}`
        );
    }

    if (req.query.owner) {
        whereCondition.push(`recipes.owner = '${req.query.owner}'`);
    }

    const recipes = await recipesService.listRecipes(whereCondition.join(' AND '));

    res.json(paginateRecipes(req.query.page, req.query.limit, recipes));
};

export const getRecipeById = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);

    if (!recipe) {
        return next(HttpError(404, 'Recipe not found'));
    }

    const ingredients = await ingredientsServices.listIngredients({ id: recipe.ingredients.map(ing => ing.id) });

    res.json({
        id: recipe.id,
        title: recipe.title,
        category: recipe.category_association,
        time: recipe.time,
        description: recipe.description,
        owner: recipe.user,
        ingredients: populateIngredients(recipe.ingredients, ingredients),
        area: recipe.area_association,
        instructions: recipe.instructions,
        thumb: recipe.thumb,
    });
};

export const createRecipe = async (req, res, next) => {
    const { id: userId } = req.user;
    const { category, area, ingredients } = req.body;

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
    if (!recipe) {
        return next(HttpError(500, 'Failed to create recipe'));
    }

    const ingredientsWithDetails = populateIngredients(ingredientsWithStringIds, existingIngredients);

    res.status(201).json({
        id: recipe.id,
        title: recipe.title,
        category: recipe.category_association,
        time: recipe.time,
        description: recipe.description,
        owner: recipe.user.id,
        ingredients: ingredientsWithDetails,
        area: recipe.area_association,
        instructions: recipe.instructions,
        thumb: recipe.thumb,
    });
};

export const deleteRecipeById = async (req, res, next) => {
    const { id } = req.params;
    const { id: owner } = req.user;

    if (!(await recipesService.deleteRecipe({ id, owner }))) {
        return next(HttpError(404, 'Recipe not found'));
    }

    res.status(204).send();
};

export const getPopularRecipes = async (req, res) => {
    const recipes = await recipesService.getPopularRecipes();

    res.json(recipes);
};

export const getFavoriteRecipes = async (req, res) => {
    const recipes = await recipesService.getFavoriteRecipes(req.user.id);

    res.json(paginateRecipes(req.query.page, req.query.limit, recipes));
};

export const addRecipeToFavorites = async (req, res, next) => {
    const { id: userId } = req.user;
    const { id } = req.params;

    if (!(await recipesService.addRecipeToFavorites(userId, id))) {
        return next(HttpError(500, 'Failed to add recipe to favorites'));
    }

    res.status(204).send();
};

export const removeFavorite = async (req, res, next) => {
    const { id: userId } = req.user;
    const { id } = req.params;

    const favorite = await recipesService.deleteFavorite(userId, id);

    if (!favorite) {
        return next(HttpError(404, 'Favorite not found'));
    }

    if (!(await favorite.destroy())) {
        return next(HttpError(500, 'Failed to remove recipe from favorites'));
    }

    res.status(204).send();
};

export const getOwnerRecipes = async (req, res, next) => {
    req.query = {
        page: req.query.page,
        limit: req.query.limit,
        owner: req.params.id,
    };
    if (!(await usersService.getUserById(req.query.owner))) {
        return next(HttpError(404, 'User not found'));
    }
    listRecipes(req, res, next);
};
