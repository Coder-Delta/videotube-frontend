import api from "@/utils/api";

export const playlistService = {
    // Get user's playlists
    getMyPlaylists: async () => {
        return api.get("/playlists");
    },

    // Get specific playlist
    getPlaylistById: async (id) => {
        return api.get(`/playlists/${id}`);
    },

    // Create new playlist
    createPlaylist: async (data) => {
        return api.post("/playlists", data);
    }
};
