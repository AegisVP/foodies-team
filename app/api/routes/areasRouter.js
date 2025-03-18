import express from 'express';
import { listAreas } from '../controllers/areasController.js';

const areasRouter = express.Router();

areasRouter.get('/', listAreas);

export default areasRouter;
