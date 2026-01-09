import api from "@/utils/api.js";

const getChannelStats = async () => {
    try {
        const response = await api.get('/dashboard/stats');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getChannelVideos = async () => {
    try {
        const response = await api.get('/dashboard/videos');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    getChannelStats,
    getChannelVideos
};
