import axios, { HEADER_MFD } from './axiosInstance.js';

export const registerUser = async userData => await axios.post('/users/register', userData);

export const loginUser = async credentials => await axios.post('/users/login', credentials);

export const logoutUser = async () => await axios.post('/users/logout');

export const getCurrentUser = async () => await axios.get('/users/current');

export const updateAvatar = async formData => await axios.patch('/users/avatar', formData, { headers: HEADER_MFD });
