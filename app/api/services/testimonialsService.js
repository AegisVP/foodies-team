import { Testimonial } from '../models/testimonials.js';
import { User } from '../models/users.js';

async function listTestimonials() {
    return await Testimonial.findAll({
        include: [
            {
                attributes: ['id', 'name'],
                model: User,
                as: 'user',
            },
        ],
    });
}

export default {
    listTestimonials,
};
