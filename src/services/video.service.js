import api from "@/utils/api.js";

const getAllVideos = async (page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId) => {
    try {
        const params = { page, limit, query, sortBy, sortType, userId };
        const response = await api.get('/videos', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getVideoById = async (videoId) => {
    try {
        const response = await api.get(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const publishAVideo = async (videoData) => {
    try {
        // videoData should be FormData
        const response = await api.post('/videos', videoData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateVideo = async (videoId, updateData) => {
    try {
        // updateData should be FormData if there is a thumbnail
        const response = await api.patch(`/videos/${videoId}`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteVideo = async (videoId) => {
    try {
        const response = await api.delete(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const togglePublishStatus = async (videoId) => {
    try {
        const response = await api.patch(`/videos/toggle/publish/${videoId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getTrendingVideos = async () => {
    try {
        const response = await api.get('/videos/trending'); // Verify endpoint
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getSubscribedVideos = async () => {
    try {
        // Assuming this endpoint exists based on old service
        const response = await api.get('/users/subscriptions/videos');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    getAllVideos,
    getVideoById,
    publishAVideo,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    getTrendingVideos,
    getSubscribedVideos
};
