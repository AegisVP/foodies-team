import axios from './axiosInstance.js';

export const getFollowers = async ({ id, page }) => {
    const followers = await axios.get(`users/followers?id=${id}&page=${page}&limit=10`);
    return followers;
};

export const getFollowees = async page => {
    const followees = await axios.get(`users/followees?page=${page}&limit=10`);
    return followees;
};

export const followUser = async id => {
    const response = await axios.post(`users/followees/${id}`);
    return response;
};

export const unfollowUser = async id => {
    const response = await axios.delete(`users/followees/${id}`);
    return response;
};
