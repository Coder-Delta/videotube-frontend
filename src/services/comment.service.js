import api from "@/utils/api";

/* ---------------- GET COMMENTS ---------------- */
const getVideoComments = async (videoId, page = 1, limit = 10) => {
    try {
        const response = await api.get(`/comments/${videoId}`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch comments:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to load comments" };
    }
};

/* ---------------- ADD COMMENT ---------------- */
const addComment = async (content, videoId) => {
    try {
        const response = await api.post(`/comments/${videoId}`, { content });
        return response.data;
    } catch (error) {
        console.error("Failed to add comment:", error.response?.data || error);

        if (error.response?.status === 401) {
            throw { message: "Please login to comment" };
        }

        throw error.response?.data || { message: "Failed to add comment" };
    }
};

/* ---------------- UPDATE COMMENT ---------------- */
const updateComment = async (commentId, content) => {
    try {
        const response = await api.patch(`/comments/c/${commentId}`, { content });
        return response.data;
    } catch (error) {
        console.error("Failed to update comment:", error.response?.data || error);

        if (error.response?.status === 401) {
            throw { message: "Unauthorized to update this comment" };
        }

        throw error.response?.data || { message: "Failed to update comment" };
    }
};

/* ---------------- DELETE COMMENT ---------------- */
const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`/comments/c/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete comment:", error.response?.data || error);

        if (error.response?.status === 401) {
            throw { message: "Unauthorized to delete this comment" };
        }

        throw error.response?.data || { message: "Failed to delete comment" };
    }
};

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment,
};