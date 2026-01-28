import api from "@/utils/api";

/* ---------------- GET COMMENTS ---------------- */
const getVideoComments = async (videoId, page = 1, limit = 10) => {
    const response = await api.get(`/comments/${videoId}`, {
        params: { page, limit },
    });
    return response.data;
};

/* ---------------- ADD COMMENT ---------------- */
const addComment = async (content, videoId) => {
    const response = await api.post(`/comments/${videoId}`, { content });
    return response.data;
};

/* ---------------- UPDATE COMMENT ---------------- */
const updateComment = async (commentId, content) => {
    const response = await api.patch(`/comments/c/${commentId}`, { content });
    return response.data;
};

/* ---------------- DELETE COMMENT ---------------- */
const deleteComment = async (commentId) => {
    const response = await api.delete(`/comments/c/${commentId}`);
    return response.data;
};

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment,
};