import { User, Follow } from "../models/users.js";

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
            as: "followers",
            through: { attributes: [] },
            attributes: ['id', 'name', 'avatar', 'email'],
        },
        attributes: ['id', 'name', 'avatar', 'email'],
    });
}

// To get users that the user follows
async function userWithFollowing(userId) {
    return await User.findByPk(userId, {
        include: {
            model: User,
            as: "following",
            through: { attributes: [] },
            attributes: ['id', 'name', 'avatar', 'email'],
        },
        attributes: ['id', 'name', 'avatar', 'email'],
    });
}

// Counts the number of users that follow the given userId.
async function countFollowers(userId) {
    return await Follow.count({ where: { followingId: userId } });
}

//  Counts the number of users that the given userId is following.
async function countFollowing(userId) {
    return await Follow.count({ where: { followerId: userId } });
}

async function followFindOne(followerId, followingId) {
    return await Follow.findOne({ where: { followerId, followingId } });
}

async function followAdd(followerId, followingId) {
    return await Follow.create({ followerId, followingId });
}

async function followDelete(followerId, followingId) {
    return await Follow.destroy({ where: { followerId, followingId } });
}

export default {
    registerUser,
    getUserById,
    getUserByEmail,
    updateUserToken,
    updateUserAvatar,
    userWithFollowers,
    userWithFollowing,
    countFollowers,
    countFollowing,
    followFindOne,
    followAdd,
    followDelete
};