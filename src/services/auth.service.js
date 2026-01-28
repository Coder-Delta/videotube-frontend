import api from "@/utils/api";

/* -------------------- auth -------------------- */

const registerUser = async (userData) => {
    try {
        const config = {};
        if (userData instanceof FormData) {
            config.headers = { "Content-Type": "multipart/form-data" };
        }
        const response = await api.post("/users/register", userData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const loggedInUser = async (userData) => {
    try {
        const response = await api.post("/users/login", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const logoutUser = async () => {
    try {
        const response = await api.post("/users/logout");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const refreshToken = async () => {
    try {
        const response = await api.post("/users/refresh-token");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const resetPassword = async (userPasswords) => {
    try {
        const response = await api.post("/users/change-password", userPasswords);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const getCurrentUser = async () => {
    try {
        const response = await api.get("/users/current-user");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const updateUserProfile = async (data) => {
    try {
        const config = {};
        if (data instanceof FormData) {
            config.headers = { "Content-Type": "multipart/form-data" };
        }

        const response = await api.patch(
            "/users/update-account",
            data,
            config
        );

        return response.data;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
        throw new Error(message);
    }
};

const getUserChannelProfile = async (username) => {
    try {
        const response = await api.get(`/users/c/${username}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

/* -------------------- watch history -------------------- */
// ✅ FIXED: proper URL + params
const watchHistory = async (params = {}) => {
    try {
        const response = await api.get("/users/history", {
            params,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const deleteAccount = async () => {
    try {
        const response = await api.delete("/users/del-acc");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

export default {
    registerUser,
    loggedInUser,
    logoutUser,
    refreshToken,
    resetPassword,
    getCurrentUser,
    updateUserProfile,
    getUserChannelProfile,
    watchHistory,
    deleteAccount,
};