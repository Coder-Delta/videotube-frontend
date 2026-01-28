import api from "@/utils/api";

/* -------------------- dashboard -------------------- */

const getChannelStats = async () => {
    try {
        const response = await api.get("/dashboard/stats");
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getChannelVideos = async () => {
    try {
        const response = await api.get("/dashboard/videos");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    getChannelStats,
    getChannelVideos,
};

export default {
    getChannelStats,
    getChannelVideos,
};