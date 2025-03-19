import { Recipe } from '../models/recipes.js';
import { User } from '../models/users.js';
import { FavoriteRecipe } from '../models/favoriteRecipes.js';
import { sequelize } from '../db/db.js';
import { QueryTypes } from 'sequelize';

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
        ],
    });
}

async function deleteFavorite(userId, recipeId) {
    return await FavoriteRecipe.findOne({
        where: { user_id: userId, recipe_id: recipeId },
    });
}

export default {
    listRecipes,
    getRecipeById,
    deleteFavorite,
};
