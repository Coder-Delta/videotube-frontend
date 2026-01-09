import api from "@/utils/api.js";

const getVideoComments = async (videoId, page = 1, limit = 10) => {
    try {
        const response = await api.get(`/comments/${videoId}`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const addComment = async (content, videoId) => {
    try {
        const response = await api.post(`/comments/${videoId}`, { content });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateComment = async (commentId, content) => {
    try {
        const response = await api.patch(`/comments/c/${commentId}`, { content });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`/comments/c/${commentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
};
