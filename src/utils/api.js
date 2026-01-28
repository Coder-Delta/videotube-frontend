import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
  withCredentials: true, // 🔥 REQUIRED
  timeout: 20000,
});

// 🌐 Global response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized – login required or token expired");
    }

    if (status === 403) {
      console.warn("Forbidden – permission denied");
    }

    return Promise.reject(error);
  }
);

export default api;