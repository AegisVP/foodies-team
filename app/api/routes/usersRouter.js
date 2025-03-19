import express from 'express';

import {
    registerNewUser,
    loginUser,
    //logoutUser,
    //getCurrentUser,
    //updateAvatar,
    //verifyEmail,
    //resendVerifyEmail
} from "../controllers/usersController.js";

import controllerWrapper from "../decorators/controllerWrapper.js";

import { usersSchema, loginSchema } from "../schemas/usersSchema.js";
import { validateBody } from "../decorators/validateBody.js";

const usersRouter = express.Router();

// usersRouter.post('/register', userController); body:{name:__, email:__, password:__}
usersRouter.post("/register", validateBody(usersSchema), controllerWrapper(registerNewUser));

// usersRouter.post('/login', userController); body:{email:__, password:__}
usersRouter.post("/login", validateBody(loginSchema), controllerWrapper(loginUser));

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
