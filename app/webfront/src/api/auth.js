import axios from './axiosInstance.js';

export const login = async (data) => {
    const user = await axios.post('/auth/login', data);
    return user;
};
