import axiosPrivateInstance from './axiosInstance';

export const getUserInformation = async userId => await axiosPrivateInstance.get(`/users/${userId}`);

export const getUserFavoriteRecipes = async userId =>
    await axiosPrivateInstance.get(`/recipes`, { params: { owner: userId } });
