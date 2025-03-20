import express from 'express';

import {
    registerNewUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAvatar
} from "../controllers/usersController.js";

import controllerWrapper from "../decorators/controllerWrapper.js";

import { usersSchema, loginSchema } from "../schemas/usersSchema.js";
import { validateBody } from "../decorators/validateBody.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(usersSchema), controllerWrapper(registerNewUser));   //  body:{name:__, email:__, password:__}
usersRouter.post("/login", validateBody(loginSchema), controllerWrapper(loginUser));            //  body:{email:__, password:__}

usersRouter.use(authMiddleware);

usersRouter.get("/current", controllerWrapper(getCurrentUser));
// usersRouter.get('/:id', userController); // отримати дані користувача

usersRouter.patch("/avatar", upload.single("avatar"), controllerWrapper(updateAvatar));

// usersRouter.get('/followers/my', userController); // перелік хто слідкує
// usersRouter.get('/followers', userController); // перелік за ким слідкуємо
// usersRouter.post('/followers/:id', userController); // додати за ким слідкуємо
// usersRouter.delete('/followers/:id', userController); // відписатися від користувача

usersRouter.post("/logout", controllerWrapper(logoutUser));

export default usersRouter;
