import axios from './axiosInstance.js';

export const getFollowers = async (id) => {
  const { followers } = await axios.get(`/followers?id=${id}`);
  return followers;
};

export const getFollowees = async (id) => {
  const { followees } = await axios.get(`/followees?id=${id}`);
  return followees;
};
