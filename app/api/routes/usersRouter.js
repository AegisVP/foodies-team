import express from 'express';

import {
    registerNewUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAvatar,
    getUserInformation
} from "../controllers/usersController.js";

import { usersSchema, loginSchema } from "../schemas/usersSchema.js";
import { validateBody } from "../decorators/validateBody.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(usersSchema), registerNewUser);   //  body:{name:__, email:__, password:__}
usersRouter.post("/login", validateBody(loginSchema), loginUser);            //  body:{email:__, password:__}

usersRouter.use(authMiddleware);

usersRouter.get("/current", getCurrentUser);
usersRouter.get('/:id', getUserInformation);

usersRouter.patch("/avatar", upload.single("avatar"), updateAvatar);

// usersRouter.get('/followers/my', userController); // перелік хто слідкує
// usersRouter.get('/followers', userController); // перелік за ким слідкуємо
// usersRouter.post('/followers/:id', userController); // додати за ким слідкуємо
// usersRouter.delete('/followers/:id', userController); // відписатися від користувача

usersRouter.post("/logout", logoutUser);

export default usersRouter;
