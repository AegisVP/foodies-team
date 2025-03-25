import { Sequelize } from 'sequelize';
import { FavoriteRecipe } from '../models/favoriteRecipes.js';
import { Recipe } from '../models/recipes.js';
import { User, Follow } from '../models/users.js';

async function registerUser(id, name, email, password, avatar) {
    const user = await User.create({ id, name, email, password, avatar });
    return user;
}

async function getUserById(userId) {
    return await User.findByPk(userId);
}

async function getUserByEmail(email) {
    return await User.findOne({ where: { email } });
}

async function updateUserToken(userId, token) {
    return await User.update({ token }, { where: { id: userId } });
}

async function updateUserAvatar(userId, avatar) {
    return await User.update({ avatar }, { where: { id: userId } });
}

// To get followers of a user
async function userWithFollowers(userId) {
    return await User.findByPk(userId, {
        include: {
            model: User,
            as: 'followers',
            through: { attributes: [] },
            attributes: [
                'id',
                'name',
                'email',
                'avatar',
                [
                    Sequelize.literal(`(SELECT COUNT(*) FROM recipes WHERE recipes.owner = "followers"."id")`),
                    'recipeCount',
                ],
            ],
            include: {
                model: Recipe,
                attributes: ['id', 'thumb'],
                limit: 4,
            },
        },
        attributes: ['id', 'name', 'email', 'avatar'],
    });
}

// To get users that the user follows
async function userWithFollowees(userId) {
    return await User.findByPk(userId, {
        include: {
            model: User,
            as: 'followees',
            through: { attributes: [] },
            attributes: [
                'id',
                'name',
                'email',
                'avatar',
                [
                    Sequelize.literal(`(SELECT COUNT(*) FROM recipes WHERE recipes.owner = "followees"."id")`),
                    'recipeCount',
                ],
            ],
            include: [
                {
                    model: Recipe,
                    attributes: ['id', 'thumb'],
                    limit: 4,
                },
            ],
        },
        attributes: ['id', 'name', 'email', 'avatar'],
    });
}

async function countUserFavorites(userId) {
    return await FavoriteRecipe.count({ where: { userId } });
}

// Counts the number of users that follow the given userId.
async function countFollowers(userId) {
    return await Follow.count({ where: { followeeId: userId } });
}

//  Counts the number of users that the given userId is following.
async function countFollowees(userId) {
    return await Follow.count({ where: { followerId: userId } });
}

async function followFindOne(followerId, followeeId) {
    return await Follow.findOne({ where: { followerId, followeeId } });
}

async function followAdd(followerId, followeeId) {
    return await Follow.create({ followerId, followeeId });
}

async function followDelete(followerId, followeeId) {
    return await Follow.destroy({ where: { followerId, followeeId } });
}

export default {
    registerUser,
    getUserById,
    getUserByEmail,
    updateUserToken,
    updateUserAvatar,
    userWithFollowers,
    userWithFollowees,
    countUserFavorites,
    countFollowers,
    countFollowees,
    followFindOne,
    followAdd,
    followDelete,
};
