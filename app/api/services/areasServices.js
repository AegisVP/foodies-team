import { Area } from '../models/areas.js';

async function listAreas(whereCondition = null) {
    return await Area.findAll({ where: whereCondition, order: [['name', 'ASC']] });
}

export default {
    listAreas,
};
