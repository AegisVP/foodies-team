import express from 'express';
import { listAreas } from '../controllers/areasController.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

const areasRouter = express.Router();

areasRouter.get('/', controllerWrapper(listAreas));

export default areasRouter;
