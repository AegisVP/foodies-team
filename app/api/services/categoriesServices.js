import { Category } from '../models/categories.js';

async function listCategories(whereCondition = null) {
    return await Category.findAll({ where: whereCondition, order: [['name', 'ASC']] });
}

export default {
    listCategories,
};
