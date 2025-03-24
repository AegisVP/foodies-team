import express from 'express';
import { listCategories } from '../controllers/categoriesController.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', controllerWrapper(listCategories));

export default categoriesRouter;
