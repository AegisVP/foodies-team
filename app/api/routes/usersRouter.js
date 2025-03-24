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
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
import controllerWrapper from '../decorators/controllerWrapper.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(usersSchema), registerNewUser); //  body:{name:__, email:__, password:__}
usersRouter.post('/login', validateBody(loginSchema), loginUser); //  body:{email:__, password:__}

usersRouter.use(authMiddleware);

usersRouter.get('/current', controllerWrapper(getCurrentUser));
usersRouter.post('/logout', controllerWrapper(logoutUser));
usersRouter.patch('/avatar', upload.single('avatar'), controllerWrapper(updateAvatar));
usersRouter.get('/followers', controllerWrapper(getUsersFollowers)); // Отримати список користувачів, які слідкують за користувачev
usersRouter.get('/followees', controllerWrapper(getUsersFollowees)); // Отримати список користувачів, за якіми слідкує користувач
usersRouter.post('/followees/:id', controllerWrapper(addUserToFollow)); // додати за ким слідкуємо
usersRouter.delete('/followees/:id', controllerWrapper(removeUserFromFollow)); // відписатися від користувача
usersRouter.get('/:id', controllerWrapper(getUserInformation));

export default usersRouter;
