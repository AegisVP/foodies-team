import { Testimonial } from '../models/testimonials.js';
import { User } from '../models/users.js';

async function listTestimonials() {
    const testimonials = await Testimonial.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'name'],
                as: 'user',
            },
        ],
    });

    return testimonials.map((testimonial) => ({
        id: testimonial.id,
        owner: testimonial.user,
        testimonial: testimonial.testimonial,
    }));
}

export default {
    listTestimonials,
};
