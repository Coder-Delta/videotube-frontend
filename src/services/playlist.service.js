import api from "@/utils/api";
import { getAuthData } from "@/utils/cookie";

/* ---------------- helpers ---------------- */
const getAuthHeaders = () => {
    const { token } = getAuthData();
    if (!token) throw new Error("Not authenticated");
    return { Authorization: `Bearer ${token}` };
};

/* ---------------- playlist CRUD ---------------- */
const createPlaylist = async (data) => {
    const response = await api.post("/playlist", data, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

const updatePlaylist = async (playlistId, data) => {
    const response = await api.patch(`/playlist/${playlistId}`, data, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

const deletePlaylist = async (playlistId) => {
    const response = await api.delete(`/playlist/${playlistId}`, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

const getPlaylistById = async (playlistId) => {
    const response = await api.get(`/playlist/${playlistId}`, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

const getUserPlaylists = async (userId) => {
    const response = await api.get(`/playlist/user/${userId}`, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

/* ---------------- my playlists ---------------- */
const getMyPlaylists = async () => {
    const { user } = getAuthData();
    if (!user) throw new Error("User not logged in");
    return getUserPlaylists(user._id);
};

/* ---------------- playlist videos ---------------- */
const addVideoToPlaylist = async (playlistId, videoId) => {
    const response = await api.patch(
        `/playlist/add/${videoId}/${playlistId}`,
        {},
        { headers: getAuthHeaders() }
    );
    return response.data;
};

const removeVideoFromPlaylist = async (playlistId, videoId) => {
    const response = await api.patch(
        `/playlist/remove/${videoId}/${playlistId}`,
        {},
        { headers: getAuthHeaders() }
    );
    return response.data;
};

/* ---------------- exports ---------------- */
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