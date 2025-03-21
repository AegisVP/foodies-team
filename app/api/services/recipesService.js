import { Recipe } from '../models/recipes.js';
import { User } from '../models/users.js';
import { FavoriteRecipe } from '../models/favoriteRecipes.js';
import { sequelize } from '../db/db.js';
import { QueryTypes } from 'sequelize';
import { Category } from '../models/categories.js';
import { Area } from '../models/areas.js';
import { v4 as uuidv4 } from 'uuid';

async function listRecipes(limit = 12, page = 1, whereCondition = null) {
    const recipes = await sequelize.query(
        `SELECT "recipes".*, 
                "user"."id" AS "user_id", 
                "user"."name" AS "user_name", 
                "user"."avatar" AS "user_avatar", 
                "user"."email" AS "user_email" FROM "recipes" AS "recipes" LEFT OUTER JOIN "users" AS "user" ON "recipes"."owner" = "user"."id" ${
                    whereCondition ? `WHERE ${whereCondition}` : ''
                } LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
        { type: QueryTypes.SELECT }
    );

    return recipes.map((recipe) => ({
        id: recipe.id,
        owner: {
            id: recipe.user_id,
            name: recipe.user_name,
            avatar: recipe.user_avatar,
        },
        title: recipe.title,
        description: recipe.description,
        thumb: recipe.thumb,
    }));
}

async function getRecipeById(id, ownerAttributes = ['id', 'name', 'avatar']) {
    return await Recipe.findByPk(id, {
        include: [
            {
                attributes: ownerAttributes,
                model: User,
                as: 'user',
            },
            {
                model: Category,
                as: 'category_association',
            },
            {
                model: Area,
                as: 'area_association',
            },
        ],
    });
}

async function deleteFavorite(userId, recipeId) {
    return await FavoriteRecipe.findOne({
        where: { user_id: userId, recipe_id: recipeId },
    });
}
async function getPopularRecipes(limit = 10, page = 1) {
    const offset = (page - 1) * limit;

    // Використовуємо SQL запит напряму, щоб уникнути проблем з регістром
    const popularRecipes = await sequelize.query(
        `
        SELECT 
            r.id,
            r.title,
            r.description,
            r.thumb,
            r.time,
            u.id as user_id,
            u.name as user_name,
            u.avatar as user_avatar,
            COUNT(fr.id) as favorite_count
        FROM 
            recipes r
        LEFT JOIN 
            users u ON r.owner = u.id
        LEFT JOIN 
            favorite_recipes fr ON r.id = fr.recipe_id
        GROUP BY 
            r.id, u.id
        ORDER BY 
            favorite_count DESC
        LIMIT :limit OFFSET :offset
    `,
        {
            replacements: { limit, offset },
            type: QueryTypes.SELECT,
        }
    );

    // Форматування відповіді
    return popularRecipes.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        thumb: recipe.thumb,
        time: recipe.time,
        favoriteCount: parseInt(recipe.favorite_count, 10) || 0,
        owner: {
            id: recipe.user_id,
            name: recipe.user_name,
            avatar: recipe.user_avatar,
        },
    }));
}

async function countRecipesByOwner(ownerId) {
    return await Recipe.count({ where: { owner: ownerId } });
}

async function deleteRecipe(query) {
    return Recipe.destroy({ where: query });
}

async function createRecipe(recipeData, userId) {

    const recipeId = uuidv4();

    const recipe = await Recipe.create({
        id: recipeId,
        title: recipeData.title,
        category: recipeData.category,
        area: recipeData.area,
        owner: userId,
        instructions: recipeData.instructions,
        description: recipeData.description,
        thumb: recipeData.thumb,
        time: recipeData.time,
        ingredients: recipeData.ingredients
    });

    return await getRecipeById(recipeId);
}

export default {
    listRecipes,
    getRecipeById,
    deleteFavorite,
    getPopularRecipes,
    countRecipesByOwner,
    deleteRecipe,
    createRecipe,
};
