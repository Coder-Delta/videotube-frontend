import axios from "axios";
import { getCookie } from "./cookie";

// axios instance (PRODUCTION SAFE)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE + "/api/v1",
    withCredentials: true,
});

// add token before every request
api.interceptors.request.use(
    (config) => {
        const token = getCookie("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// handle response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized request");
        }

        return Promise.reject(error);
    }
);

export default api;
