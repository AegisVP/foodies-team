import testimonialsService from '../services/testimonialsService.js';

export const listTestimonials = async (_, res) => {
    const testimonials = await testimonialsService.listTestimonials();

    res.json(
        testimonials.map(testimonial => ({
            id: testimonial.id,
            owner: testimonial.user,
            testimonial: testimonial.testimonial,
        }))
    );
};
