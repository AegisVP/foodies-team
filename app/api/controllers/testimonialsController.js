import testimonialsService from '../services/testimonialsService.js';

export const getAllTestimonials = async (_, res) => {
    res.json(await testimonialsService.listTestimonials());
};
