import axios from './axiosInstance.js';

export const getFollowers = async id => {
    const followers = await axios.get(`users/followers?id=${id}`);
    return followers;
};

export const getFollowees = async () => {
    const followees = await axios.get('users/followees');
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
