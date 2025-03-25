import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import path from 'node:path';
import fs from 'node:fs/promises';
import usersService from '../services/usersService.js';
import recipesService from '../services/recipesService.js';
import HttpError from '../helpers/HttpError.js';
import { paginateItems } from '../helpers/paginate.js';

const avatarsDir = path.resolve('public/avatars');

export const registerNewUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const existingUser = await usersService.getUserByEmail(email);

    if (existingUser) {
        return next(HttpError(409, 'Email in use'));
    }

    const id = nanoid();
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = await gravatar.url(email, { s: '250', d: 'retro' }, true);

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

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await usersService.getUserByEmail(email);

    if (!user) {
        return next(HttpError(401, 'Email or password is wrong'));
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        return next(HttpError(401, 'Email or password is wrong'));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const result = await usersService.updateUserToken(user.id, token);

    if (!result) {
        return next(HttpError(401, 'Email or password is wrong'));
    }

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        },
    });
};

export const logoutUser = async (req, res, next) => {
    const { id } = req.user;

    const user = await usersService.getUserById(id);

    if (!user) {
        return next(HttpError(401, 'Not authorized'));
    }

    await usersService.updateUserToken(id, null);
    res.status(204).send();
};

export const getCurrentUser = async (req, res, next) => {
    const { id } = req.user;
    const user = await usersService.getUserById(id);

    if (!user) {
        return next(HttpError(401, 'Not authorized'));
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
    });
};

export const updateAvatar = async (req, res, next) => {
    if (!req.file) {
        return next(HttpError(400, 'No file uploaded'));
    }

    const { path: tempPath, filename } = req.file;
    const newAvatarName = `${req.user.id}-${Date.now()}${path.extname(filename)}`;
    const newAvatarPath = path.join(avatarsDir, newAvatarName);

    await fs.rename(tempPath, newAvatarPath);

    const avatar = `/avatars/${newAvatarName}`;
    await usersService.updateUserAvatar(req.user.id, avatar);

    res.json({ avatar });
};

export const getUserInformation = async (req, res, next) => {
    const requestedUserId = req.params.id;
    const authUserId = req.user.id;
    const user = await usersService.getUserById(requestedUserId);

    if (!user) {
        return next(HttpError(404, 'User not found'));
    }

    const recipeCount = await recipesService.countRecipesByOwner(requestedUserId);
    const followersCount = await usersService.countFollowers(requestedUserId);

    let response = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        recipesCount: recipeCount,
        followersCount: followersCount,
    };

    if (authUserId === requestedUserId) {
        const favoriteCount = await usersService.countUserFavorites(authUserId);
        const followeesCount = await usersService.countFollowees(authUserId);

        response = {
            ...response,
            favoriteCount: favoriteCount,
            followeesCount: followeesCount,
        };
    }

    res.json(response);
};

export const getUsersFollowers = async (req, res) => {
    const requestedUserId = req.query.id ?? req.user.id;
    const allFollowers = await usersService.userWithFollowers(requestedUserId);
    const { page, pages, total, items: followers } = paginateItems(req.query.page, req.query.limit, allFollowers);

    res.json({ page, pages, total, followers });
};

export const getUsersFollowees = async (req, res) => {
    const authUserId = req.user.id;
    const allFollowees = await usersService.userWithFollowees(authUserId);
    const { page, pages, total, items: followees } = paginateItems(req.query.page, req.query.limit, allFollowees);
    res.json({ page, pages, total, followees });
};

export const addUserToFollow = async (req, res, next) => {
    const followerId = req.user.id;
    const followeeId = req.params.id;

    if (followerId === followeeId) {
        return next(HttpError(400, "You can't follow yourself."));
    }

    if (!(await usersService.getUserById(followeeId))) {
        return next(HttpError(404, 'User to follow not found'));
    }

    if (await usersService.followFindOne(followerId, followeeId)) {
        return next(HttpError(400, 'You are already following this user.'));
    }

    await usersService.followAdd(followerId, followeeId);

    res.status(204).send();
};

export const removeUserFromFollow = async (req, res, next) => {
    const followerId = req.user.id;
    const followeeId = req.params.id;

    if (!(await usersService.getUserById(followeeId))) {
        return next(HttpError(404, 'User to unfollow not found'));
    }

    if (!(await usersService.followDelete(followerId, followeeId))) {
        return next(HttpError(400, 'You are not subscribed to this user'));
    }

    res.status(204).send();
};
