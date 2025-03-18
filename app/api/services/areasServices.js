import { Area } from '../models/areas.js';

async function listAreas(whereCondition = null) {
    return await Area.findAll({ where: whereCondition });
}

export default {
    listAreas,
};
