import { Recipe } from '../models/recipes.js';
import { User } from '../models/users.js';
import { sequelize } from '../db/db.js';
import { QueryTypes } from 'sequelize';

async function listRecipes(limit, offset, whereCondition = null) {
    return await sequelize.query(
        `SELECT "recipes".*, 
                "user"."id" AS "user_id", 
                "user"."name" AS "user_name", 
                "user"."avatar" AS "user_avatar", 
                "user"."email" AS "user_email" FROM "recipes" AS "recipes" LEFT OUTER JOIN "users" AS "user" ON "recipes"."owner" = "user"."id" ${
                    whereCondition ? `WHERE ${whereCondition}` : ''
                } LIMIT ${limit} OFFSET ${offset}`,
        { type: QueryTypes.SELECT }
    );
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

export default {
    listRecipes,
    getRecipeById,
};
