import express from 'express';

import {
    registerNewUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAvatar,
    getUserInformation,
    getUserFollowers,
    getCurrentUserFollowers,
    getCurrentUserFollowing,
    addUserToFollow,
    removeUserFromFollow
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
usersRouter.patch("/avatar", upload.single("avatar"), updateAvatar);
usersRouter.get('/:id/followers', getUserFollowers);            // Отримати список користувачів, що слідкують за профілем користувача
usersRouter.get('/followers/my', getCurrentUserFollowers);      // Отримати список користувачів, які слідкують за профілем авторизованого користувача
usersRouter.get('/followers', getCurrentUserFollowing);         // Отримати список користувачів, за якіми слідкує авторизований користувач 
usersRouter.post('/followers/:id', addUserToFollow);            // додати за ким слідкуємо
usersRouter.delete('/followers/:id', removeUserFromFollow);     // відписатися від користувача
usersRouter.get('/:id', getUserInformation);
usersRouter.post("/logout", logoutUser);

export default usersRouter;
