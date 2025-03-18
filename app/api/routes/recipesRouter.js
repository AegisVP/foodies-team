import express from 'express';
import { listRecipes, getRecipeById } from '../controllers/recipiesController.js';

const recipiesRouter = express.Router();

recipiesRouter.get('/', listRecipes);
recipiesRouter.get('/:id', getRecipeById);

export default recipiesRouter;
