import { Testimonial } from '../models/testimonials.js';
import { User } from '../models/users.js';

async function listTestimonials() {
    return Testimonial.findAll({
        attributes: ['testimonial'],
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });
}

export default {
    listTestimonials,
};
