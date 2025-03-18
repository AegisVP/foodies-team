import express from 'express';
import { listCategories } from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', listCategories);

export default categoriesRouter;
