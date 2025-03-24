import express from 'express';
import { listIngredients } from '../controllers/ingredientsController.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', controllerWrapper(listIngredients));

export default ingredientsRouter;
