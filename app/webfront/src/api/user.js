import axios from './axiosInstance';

export const getUserInformation = async userId => await axios.get(`/users/${userId}`);

export const getUserFavoriteRecipes = async userId => await axios.get(`/recipes`, { params: { owner: userId } });

export const getFollowers = async id => await axios.get(`users/followers?id=${id}`);

export const getFollowees = async () => await axios.get('users/followees');

export const followUser = async id => await axios.post(`users/followees/${id}`);

export const unfollowUser = async id => await axios.delete(`users/followees/${id}`);
