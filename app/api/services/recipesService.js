import { Recipe } from '../models/recipes.js';
import { User } from '../models/users.js';

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
    getRecipeById,
};
