import axios from './axiosInstance.js';

export const getFollowers = async (id) => {
  const followers = await axios.get(`users/followers?id=${id}`);
  return followers;
};

export const getFollowees = async (id) => {
  const followees = await axios.get(`users/followees?id=${id}`);
  return followees;
};

export const followUser = async (id) => {
  const response = await axios.post(`users/followees/${id}`);
  return response;
};

export const unfollowUser = async (id) => {
  const response = await axios.delete(`users/followees/${id}`);
  return response;
};
