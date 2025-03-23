import axiosPrivateInstance from './axiosInstance.js';

export const registerUser = async (userData) => {
  const response = await axiosPrivateInstance.post('/users/register', userData);
  return response;
};

export const loginUser = async (credentials) => {
    const response = await axiosPrivateInstance.post('/users/login', credentials);
    return response;
};

export const logoutUser = async () => {
  const response = await axiosPrivateInstance.post('/users/logout');
  return response;
};