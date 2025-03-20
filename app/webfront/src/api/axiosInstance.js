import axios from 'axios';

const baseURL = "/api";

const axiosPrivateInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// TODO add token extraction
axiosPrivateInstance.interceptors.request.use(async (config) => {
    const accessToken = "";
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

axiosPrivateInstance.interceptors.response.use(
    (response) => response.data,
    (error) => error
);

export default axiosPrivateInstance;
