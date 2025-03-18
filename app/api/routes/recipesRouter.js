import express from 'express';
import { getRecipeById } from '../controllers/recipiesController.js';

const recipiesRouter = express.Router();

recipiesRouter.get('/:id', getRecipeById);

export default recipiesRouter;
