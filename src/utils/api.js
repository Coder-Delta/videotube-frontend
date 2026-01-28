import axios from "axios";
import { getCookie } from "./cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
  withCredentials: true,
  timeout: 20000, // Render sleep safe
});

// 🔐 Attach token automatically
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

// 🌐 Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized – token expired or missing");
      // optional: redirect to login
    }

    if (status === 403) {
      console.warn("Forbidden – insufficient permissions");
    }

    return Promise.reject(error);
  }
);

export default api;