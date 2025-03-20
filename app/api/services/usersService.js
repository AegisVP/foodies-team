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
        include: { model: User, as: "followers" },
    });
}

// To get users that the user follows
async function userWithFollowing(userId) {
    return await User.findByPk(userId, {
        include: { model: User, as: "following" },
    });
}

// Counts the number of users that follow the given userId.
async function countFollowers(userId) {
    try {
        const followersCount = await Follow.count({
            where: { followingId: userId },
        });
        return followersCount;
    } catch (error) {
        console.error("Error counting followers:", error);
        throw error;
    }
}

//  Counts the number of users that the given userId is following.
async function countFollowing(userId) {
    try {
        const followingCount = await Follow.count({
            where: { followerId: userId },
        });
        return followingCount;
    } catch (error) {
        console.error("Error counting following:", error);
        throw error;
    }
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
    countFollowing
};