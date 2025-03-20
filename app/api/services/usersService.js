import { User } from "../models/users.js";

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

export default { registerUser, getUserById, getUserByEmail, updateUserToken, updateUserAvatar };