import axiosPrivateInstance from './axiosInstance.js';

export const registerUser = async userData => {
    const response = await axiosPrivateInstance.post('/users/register', userData);
    return response;
};

export const loginUser = async credentials => {
    const response = await axiosPrivateInstance.post('/users/login', credentials);
    return response;
};

export const logoutUser = async () => {
    const response = await axiosPrivateInstance.post('/users/logout');
    return response;
};

export const getCurrentUser = async () => {
    const response = await axiosPrivateInstance.get('/users/current');
    return response;
};

export const updateAvatar = async avatar => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const formData = new FormData();
    formData.append('avatar', avatar);
    const response = await axiosPrivateInstance.patch('/users/avatar', formData, { headers });
    return response;
};
