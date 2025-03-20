import axiosPublic from './axiosPublic.js';

export const login = async (data) => {
    const user = await axiosPublic.post('/auth/login', data);
    return user;
};