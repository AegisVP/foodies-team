import express from 'express';
// import authRouter from './authRouter.js';
import usersRouter from './usersRouter.js';
import categoriesRouter from './categoriesRouter.js';
import areasRouter from './areasRouter.js';
import ingredientsRouter from './ingredientsRouter.js';
import testimonialsRouter from './testimonialsRouter.js';
import recipesRouter from './recipesRouter.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

const router = express.Router();

// router.use('/auth', authRouter);
router.use('/users', controllerWrapper(usersRouter));
router.use('/categories', controllerWrapper(categoriesRouter));
router.use('/areas', controllerWrapper(areasRouter));
router.use('/ingredients', controllerWrapper(ingredientsRouter));
router.use('/testimonials', controllerWrapper(testimonialsRouter));
router.use('/recipes', controllerWrapper(recipesRouter));

router.use((req, res) => res.status(404).json({ message: 'Not found' }));

export default router;
