import express from 'express';

import {
    registerNewUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAvatar,
    getUserInformation,
    getUsersFollowers,
    getUsersFollowees,
    addUserToFollow,
    removeUserFromFollow,
} from '../controllers/usersController.js';

import { usersSchema, loginSchema } from '../schemas/usersSchema.js';
import { validateBody } from '../decorators/validateBody.js';
import authMiddleware, { userMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(usersSchema), registerNewUser); //  body:{name:__, email:__, password:__}
usersRouter.post('/login', validateBody(loginSchema), loginUser); //  body:{email:__, password:__}

// usersRouter.use(authMiddleware);

usersRouter.get('/current', authMiddleware, controllerWrapper(getCurrentUser));
usersRouter.post('/logout', authMiddleware, controllerWrapper(logoutUser));
usersRouter.patch('/avatar', authMiddleware, upload.single('avatar'), controllerWrapper(updateAvatar));
usersRouter.get('/followers', authMiddleware, controllerWrapper(getUsersFollowers)); // Отримати список користувачів, які слідкують за користувачev
usersRouter.get('/followees', authMiddleware, controllerWrapper(getUsersFollowees)); // Отримати список користувачів, за якіми слідкує користувач
usersRouter.post('/followees/:id', authMiddleware, controllerWrapper(addUserToFollow)); // додати за ким слідкуємо
usersRouter.delete('/followees/:id', authMiddleware, controllerWrapper(removeUserFromFollow)); // відписатися від користувача

usersRouter.get('/:id', userMiddleware, controllerWrapper(getUserInformation));

export default usersRouter;
