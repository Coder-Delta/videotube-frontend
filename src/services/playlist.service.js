import api from "@/utils/api";
import { getAuthData } from "@/utils/cookie";

/* -------------------- helpers -------------------- */
const getAuthHeaders = () => {
    const { token } = getAuthData();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/* -------------------- playlist CRUD -------------------- */
const createPlaylist = async (data) => {
    try {
        const response = await api.post("/playlist", data, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Create playlist failed:", error);
        throw error;
    }
};

const updatePlaylist = (playlistId, data) => {
    return api.patch(`/playlist/${playlistId}`, data, {
        headers: getAuthHeaders(),
    });
};

const deletePlaylist = (playlistId) => {
    return api.delete(`/playlist/${playlistId}`, {
        headers: getAuthHeaders(),
    });
};

const getPlaylistById = (playlistId) => {
    return api.get(`/playlist/${playlistId}`, {
        headers: getAuthHeaders(),
    });
};

const getUserPlaylists = (userId) => {
    return api.get(`/playlist/user/${userId}`, {
        headers: getAuthHeaders(),
    });
};

/* -------------------- my playlists -------------------- */
const getMyPlaylists = () => {
    const { user } = getAuthData();
    if (!user) return Promise.reject("User not logged in");
    return getUserPlaylists(user._id);
};

/* -------------------- playlist videos -------------------- */
const addVideoToPlaylist = (playlistId, videoId) => {
    return api.patch(`/playlist/add/${videoId}/${playlistId}`, {}, {
        headers: getAuthHeaders(),
    });
};

const removeVideoFromPlaylist = (playlistId, videoId) => {
    return api.patch(`/playlist/remove/${videoId}/${playlistId}`, {}, {
        headers: getAuthHeaders(),
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
    removeVideoFromPlaylist,
};

export default {
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    getMyPlaylists,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
};