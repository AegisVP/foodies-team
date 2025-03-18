import { Ingredient } from '../models/ingredients.js';

async function listIngredients(whereCondition = null) {
    return await Ingredient.findAll({ where: whereCondition });
}

export default {
    listIngredients,
};
