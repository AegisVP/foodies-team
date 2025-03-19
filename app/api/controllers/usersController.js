import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await usersService.getUserByEmail(email);

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
    const result = await usersService.updateUserToken(user.id, token);
    
    if (!result) {
      throw HttpError(401, "Email or password is wrong");
    }

    res.json({
        token,
        user: {
            name: user.name,
            email: user.email
        },
    });
};

export const logoutUser = async (req, res) => {
    const { id } = req.user;

    const user = await usersService.getUserById(id);

    if (!user) {
        throw HttpError(401, "Not authorized");
    }

    await usersService.updateUserToken(id, null);
    res.status(204).json();
};