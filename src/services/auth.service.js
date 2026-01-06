import api from "./api.js";

const registerUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const loggedInUser = async (userData) => {
    try {
        const response = await api.post('/users/loggedinuser', userData);
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

const updateUserProfile = async (userData) => {
    try {
        const response = await api.patch('/users/update-profile', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const updateAvatar = async (avatarData) => {
    try {
        const response = await api.patch('/users/update-avatar', avatarData);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const updateCoverPhoto = async (coverPhotoData) => {
    try {
        const response = await api.patch('/users/update-cover-photo', coverPhotoData);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const getUserChannelProfile = async (userId) => {
    try {
        const response = await api.get(`/users/channel/${userId}`);
        return response.data;
    }
    catch (error) {
        throw error.response?.data || { message: "Something went wrong" };
    }
};

const watchHistory = async (historyData) => {
    try {
        const response = await api.post('/users/watch-history', historyData);
        return response.data;
    }
    catch (error) {
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
    updateAvatar,
    updateCoverPhoto,
    getUserChannelProfile,
    watchHistory
};