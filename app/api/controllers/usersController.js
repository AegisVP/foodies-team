import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import path from 'node:path';
import fs from 'node:fs/promises';
import usersService from '../services/usersService.js';
import recipesService from '../services/recipesService.js';
import HttpError from '../helpers/HttpError.js';

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
            name: user.name,
            email: user.email,
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
    res.status(204).json();
};

export const getCurrentUser = async (req, res, next) => {
    const { id } = req.user;
    const user = await usersService.getUserById(id);

    if (!user) {
        return next(HttpError(401, 'Not authorized'));
    }

    res.json({
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
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        recipesCount: recipeCount,
        followersCount: followersCount,
    };

    if (authUserId === requestedUserId) {
        const favoriteCount = 'TBD'; //await Favorite.count({ where: { userId: authUserId } });
        const followingCount = await usersService.countFollowing(authUserId);

        response = {
            ...response,
            favoriteCount: favoriteCount,
            followingCount: followingCount,
        };
    }

    res.json(response);
};

export const getUserFollowers = async (req, res) => {
    const requestedUserId = req.params.id;
    const followers = await usersService.userWithFollowers(requestedUserId);
    res.json(followers);
};

export const getCurrentUserFollowers = async (req, res) => {
    const authUserId = req.user.id;
    const followers = await usersService.userWithFollowers(authUserId);
    res.json(followers);
};

export const getCurrentUserFollowing = async (req, res) => {
    const authUserId = req.user.id;
    const followers = await usersService.userWithFollowing(authUserId);
    res.json(followers);
};

export const addUserToFollow = async (req, res, next) => {
    const followerId = req.user.id;
    const followingId = req.params.id;

    const userToFollowExists = await usersService.getUserById(followingId);

    if (!userToFollowExists) {
        return next(HttpError(404, 'User to follow not found'));
    }

    if (followerId === followingId) {
        return next(HttpError(400, "You can't follow yourself."));
    }

    const existingFollow = await usersService.followFindOne(followerId, followingId);

    if (existingFollow) {
        return next(HttpError(400, 'You are already following this user.'));
    }

    await usersService.followAdd(followerId, followingId);

    res.status(201).json({ message: 'User followed successfully' });
};

export const removeUserFromFollow = async (req, res, next) => {
    const followerId = req.user.id;
    const followingId = req.params.id;

    const userToUnfollowExist = await usersService.getUserById(followingId);

    if (!userToUnfollowExist) {
        return next(HttpError(404, 'User to unfollow not found'));
    }

    const deleted = await usersService.followDelete(followerId, followingId);

    if (deleted) {
        res.status(200).json({ message: 'You have successfully unsubscribed' });
    } else {
        res.status(400).json({ message: 'You have already unsubscribed' });
    }
};
