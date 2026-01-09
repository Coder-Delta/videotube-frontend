import api from "@/utils/api";

export const videoService = {
    // Get all videos (Home page)
    getAllVideos: async () => {
        return api.get("/videos");
    },

    // Get trending videos
    getTrending: async () => {
        return api.get("/videos/trending");
    },

    // Get subscribed videos
    getSubscriptions: async () => {
        return api.get("/users/subscriptions/videos");
    },

    // Get specific video by ID
    getVideoById: async (id) => {
        return api.get(`/videos/${id}`);
    },

    // Get recommended videos (random/algorithm)
    getRecommended: async () => {
        return api.get("/videos/random");
    },

    // Upload video
    uploadVideo: async (formData) => {
        return api.post("/videos/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
};
