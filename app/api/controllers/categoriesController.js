import categoriesServices from '../services/categoriesServices.js';

export const listCategories = async (_, res) => {
    res.json(await categoriesServices.listCategories());
};
