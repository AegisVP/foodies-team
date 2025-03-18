import express from 'express';

const usersRouter = express.Router();

// usersRouter.post('/register', userController); body:{email:__, password:__}
// usersRouter.post('/login', userController); body:{email:__, password:__}

// usersRouter.use(authMiddleware);

// usersRouter.get('/current', userController); // отримати свої дані
// usersRouter.get('/:id', userController); // отримати дані користувача

// usersRouter.post('/avatar', userController);

// usersRouter.get('/followers/my', userController); // перелік хто слідкує

// usersRouter.get('/followers', userController); // перелік за ким слідкуємо
// usersRouter.post('/followers/:id', userController); // додати за ким слідкуємо
// usersRouter.delete('/followers/:id', userController); // відписатися від користувача

// usersRouter.get('/logout', userController); // logout користувача

export default usersRouter;
