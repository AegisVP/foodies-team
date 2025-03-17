import testimonialsService from '../services/testimonialsService.js';

export const listTestimonials = async (_, res) => {
    res.json(await testimonialsService.listTestimonials());
};
