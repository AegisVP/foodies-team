import { User } from "../models/users.js";

async function registerUser(id, name, email, password, avatar) {
    const user = await User.create({ id, name, email, password, avatar });
    return user;
}

async function getUserByEmail(email) {
    return await User.findOne({ where: { email } });
}

async function updateUserToken(userId, token) {
    return await User.update({ token }, { where: { id: userId } });
}

export default { registerUser, getUserByEmail, updateUserToken };