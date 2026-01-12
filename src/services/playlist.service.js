import axios from 'axios';
import { getAuthData } from "@/utils/cookie";

const API_URL = '/api/v1/playlist';

const getAuthHeaders = () => {
    const { token } = getAuthData();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const createPlaylist = async (data) => {
    try {
        const response = await axios.post(API_URL, data, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Create playlist failed:", error);
        throw error;
    }
};


const updatePlaylist = (playlistId, data) => {
    return axios.patch(`${API_URL}/${playlistId}`, data, {
        headers: getAuthHeaders()
    });
};

const deletePlaylist = (playlistId) => {
    return axios.delete(`${API_URL}/${playlistId}`, {
        headers: getAuthHeaders()
    });
};

const getPlaylistById = (playlistId) => {
    return axios.get(`${API_URL}/${playlistId}`, {
        headers: getAuthHeaders()
    });
};

const getUserPlaylists = (userId) => {
    return axios.get(`${API_URL}/user/${userId}`, {
        headers: getAuthHeaders()
    });
};

// Helper for "My Playlists" - fetches for currently logged in user
const getMyPlaylists = () => {
    const { user } = getAuthData();
    if (!user) return Promise.reject("User not logged in");
    return getUserPlaylists(user._id);
};


const addVideoToPlaylist = (playlistId, videoId) => {
    return axios.patch(`${API_URL}/add/${videoId}/${playlistId}`, {}, {
        headers: getAuthHeaders()
    });
};

const removeVideoFromPlaylist = (playlistId, videoId) => {
    return axios.patch(`${API_URL}/remove/${videoId}/${playlistId}`, {}, {
        headers: getAuthHeaders()
    });
};

export {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    getMyPlaylists,
    addVideoToPlaylist,
    removeVideoFromPlaylist
};

export default {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    getMyPlaylists,
    addVideoToPlaylist,
    removeVideoFromPlaylist
};
