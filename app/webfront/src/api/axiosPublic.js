import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosPublicInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosPublicInstance.interceptors.response.use(
    (response) => response.data,
    (error) => error
);

export default axiosPublicInstance;