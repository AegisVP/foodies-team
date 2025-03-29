import axios from 'axios';

const baseURL = import.meta.env.VITE_BASEURL ?? '/api';

const axiosPrivateInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosPrivateInstance.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem('token');
        console.log({ accessToken });
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log({ config });
        } else {
            delete config.headers.Authorization;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosPrivateInstance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
);

export default axiosPrivateInstance;
