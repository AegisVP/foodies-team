import areasServices from '../services/areasServices.js';

export const listAreas = async (_, res) => {
    res.json(await areasServices.listAreas());
};
