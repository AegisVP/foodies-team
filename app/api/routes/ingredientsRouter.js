import express from 'express';
import { listIngredients } from '../controllers/ingredientsController.js';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', listIngredients);

export default ingredientsRouter;
