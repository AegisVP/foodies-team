import express from 'express';
// import authRouter from './authRouter.js';
// import usersRouter from './usersRouter.js';
// import categoriesRouter from './categoriesRouter.js';
// import areasRouter from './areasRouter.js';
// import ingredientsRouter from './ingredientsRouter.js';
import testimonialsRouter from './testimonialsRouter.js';
// import recipesRouter from './recipesRouter.js';

const router = express.Router();

// router.use('/auth', authRouter);
// router.use('/users', usersRouter);
// router.use('/categories', categoriesRouter);
// router.use('/areas', areasRouter);
// router.use('/ingredients', ingredientsRouter);
router.use('/testimonials', testimonialsRouter);
// router.use('/recipes', recipesRouter);

router.get('/message', (req, res) => res.json({ message: 'Hello from backend!' })); // just for testing

export default router;
