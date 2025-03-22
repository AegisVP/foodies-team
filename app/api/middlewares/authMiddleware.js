import jwt from 'jsonwebtoken';
import HttpError from '../helpers/HttpError.js';
import usersService from '../services/usersService.js';

const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.warn('Authorization header missing or malformed');
        return next(HttpError(401, 'Not authorized'));
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return next(HttpError(401, 'Invalid token'));
    }

    const user = await usersService.getUserById(decoded.id);

    if (!user || user.token !== token) {
        console.warn('User not found or token mismatch');
        return next(HttpError(401, 'Not authorized'));
    }

    req.user = user;
    next();
};

export default authMiddleware;
