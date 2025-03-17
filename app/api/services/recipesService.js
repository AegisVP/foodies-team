import { Recipe } from '../models/recipes.js';
import { User } from '../models/users.js';
import { Ingredient } from '../models/ingredients.js';

async function getRecipeById(id) {
    const recipe = await Recipe.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['name'],
                as: 'user',
            },
        ],
    });

    if (!recipe) return null;

    let ingredientsData = [];
    if (recipe.ingredients) {
        const ingredientIds = recipe.ingredients.map((ing) => ing.id);
        const ingredients = await Ingredient.findAll({
            where: { id: ingredientIds },
            attributes: ['id', 'name', 'image'],
        });

        ingredientsData = recipe.ingredients.map((ing) => {
            const ingredient = ingredients.find((i) => i.id === ing.id);
            return {
                id: ing.id,
                name: ingredient.name,
                image: ingredient.image,
                measure: ing.measure,
            };
        });
    }

    return {
        id: recipe.id,
        title: recipe.title,
        category: recipe.category,
        time: recipe.time,
        description: recipe.description,
        owner: recipe.user,
        ingredients: ingredientsData,
        area: recipe.area,
        instructions: recipe.instructions,
        thumb: recipe.thumb,
    };
}

export default {
    getRecipeById,
};
