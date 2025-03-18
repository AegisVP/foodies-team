import express from 'express';
import { listTestimonials } from '../controllers/testimonialsController.js';

const testimonialsRouter = express.Router();

testimonialsRouter.get('/', listTestimonials);

export default testimonialsRouter;
