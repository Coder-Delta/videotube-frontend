import api from "@/utils/api.js";
import createFormData from "@/utils/fromData.js";

const registerUser = async (userData) => {
    try {
        // userData can be JSON or FormData. If it's FormData, let axios handle headers or set explicitly if needed.
        // But to be consistent with other file uploads:
        const config = {};
        if (userData instanceof FormData) {
            config.headers = { "Content-Type": "multipart/form-data" };
        }
        const response = await api.post('/users/register', userData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const loggedInUser = async (userData) => {
    try {
        const response = await api.post('/users/login', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const logoutUser = async (userData) => {
    try {
        const response = await api.post('/users/logout', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const refreshToken = async (userData) => {
    try {
        const response = await api.post('/users/refresh-token', userData);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const resetPassword = async (userPasswords) => {
    try {
        const response = await api.post('/users/change-password', userPasswords);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const getCurrentUser = async () => {
    try {
        const response = await api.get('/users/current-user');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const updateUserProfile = async (data) => {
    try {
        const config = {};

        // Axios auto-handles multipart boundaries
        if (data instanceof FormData) {
            config.headers = { "Content-Type": "multipart/form-data" };
        }

        const { data: responseData } = await api.patch(
            "/users/update-account",
            data,
            config
        );

        return responseData;
    } catch (error) {
        // Always throw Error instance
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
    }
    catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const watchHistory = async (historyData) => {
    try {
        const response = await api.get('users/history', historyData);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const deleteAccount = async () => {
    try {
        const response = await api.delete('/users/del-acc');
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
    deleteAccount
};