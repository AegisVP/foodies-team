import axios from 'axios';

axios.defaults.baseURL = '/api';

export const getMessage = async () => {
    const { data } = await axios.get('/message');
    return data;
};

export const getCategories = async () => {
    const { data } = await axios.get('/categories');
    return data;
};
