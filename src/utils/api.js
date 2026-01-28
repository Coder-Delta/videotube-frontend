import axios from "axios";
import { getCookie } from "./cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
  withCredentials: true, // ✅ REQUIRED FOR PROD
  timeout: 20000,
});

// 🔐 Attach token automatically (SAFE)
api.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");

    // ✅ only attach header if token is readable
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🌐 Global error handling (UNCHANGED)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized – token expired or missing");
    }

    if (status === 403) {
      console.warn("Forbidden – insufficient permissions");
    }

    return Promise.reject(error);
  }
);

export default api;