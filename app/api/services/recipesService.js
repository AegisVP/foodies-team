import { Recipe } from '../models/recipes.js';
import { User } from '../models/users.js';

async function getRecipeById(id) {
    return await Recipe.findByPk(id, {
        include: [
            {
                model: User,
                as: 'user',
            },
        ],
    });
}

export default {
    getRecipeById,
};
