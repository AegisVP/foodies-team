import express from 'express';
import { listTestimonials } from '../controllers/testimonialsController.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

const testimonialsRouter = express.Router();

testimonialsRouter.get('/', controllerWrapper(listTestimonials));

export default testimonialsRouter;
