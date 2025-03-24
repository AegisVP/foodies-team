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
            attributes: ['id', 'name', 'avatar', 'email'],
        },
        attributes: ['id', 'name', 'avatar', 'email'],
    });
}

// To get users that the user follows
async function userWithFollowees(userId) {
    return await User.findByPk(userId, {
        include: {
            model: User,
            as: 'followees',
            through: { attributes: [] },
            attributes: ['id', 'name', 'avatar', 'email'],
        },
        attributes: ['id', 'name', 'avatar', 'email'],
    });
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
    countFollowers,
    countFollowees,
    followFindOne,
    followAdd,
    followDelete,
};
