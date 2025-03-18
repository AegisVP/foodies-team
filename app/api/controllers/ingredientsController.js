import ingredientsServices from '../services/ingredientsServices.js';

export const listIngredients = async (_, res) => {
    res.json(await ingredientsServices.listIngredients());
};
