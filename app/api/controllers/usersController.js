import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import usersService from "../services/usersService.js";
import HttpError from "../helpers/HttpError.js";

export const registerNewUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await usersService.getUserByEmail(email);

    if (existingUser) {
        throw HttpError(409, "Email in use");
    }

    const id = nanoid();
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = await gravatar.url(email, { s: "250", d: "retro" }, true);
  
    const newUser = await usersService.registerUser(id, name, email, hashedPassword, avatarURL);

    res.status(201).json({
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
      },
    });
};