import api from "@/utils/api.js";

const createPlaylist = async (name, description) => {
    try {
        const response = await api.post('/playlists', { name, description });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUserPlaylists = async (userId) => {
    try {
        const response = await api.get(`/playlists/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getPlaylistById = async (playlistId) => {
    try {
        const response = await api.get(`/playlists/${playlistId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const addVideoToPlaylist = async (playlistId, videoId) => {
    try {
        const response = await api.patch(`/playlists/add/${videoId}/${playlistId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const removeVideoFromPlaylist = async (playlistId, videoId) => {
    try {
        const response = await api.patch(`/playlists/remove/${videoId}/${playlistId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deletePlaylist = async (playlistId) => {
    try {
        const response = await api.delete(`/playlists/${playlistId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updatePlaylist = async (playlistId, name, description) => {
    try {
        const response = await api.patch(`/playlists/${playlistId}`, { name, description });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getMyPlaylists = async () => {
    try {
        const response = await api.get('/playlists');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
    getMyPlaylists
};
