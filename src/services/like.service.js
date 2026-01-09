import api from "@/utils/api.js";

const toggleVideoLike = async (videoId) => {
    try {
        const response = await api.post(`/likes/toggle/v/${videoId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const toggleCommentLike = async (commentId) => {
    try {
        const response = await api.post(`/likes/toggle/c/${commentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const toggleTweetLike = async (tweetId) => {
    try {
        const response = await api.post(`/likes/toggle/t/${tweetId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getLikedVideos = async () => {
    try {
        const response = await api.get('/likes/videos');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
};
