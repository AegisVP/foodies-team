import express from 'express';
import { getAllTestimonials } from '../controllers/testimonialsController.js';

const testimonialsRouter = express.Router();

testimonialsRouter.get('/', getAllTestimonials);

export default testimonialsRouter;
