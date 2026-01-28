import api from "@/utils/api";

/* -------------------- tweets -------------------- */

const createTweet = async (content) => {
    try {
        const response = await api.post("/tweets", { content });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUserTweets = async (userId) => {
    try {
        const response = await api.get(`/tweets/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateTweet = async (tweetId, content) => {
    try {
        const response = await api.patch(`/tweets/${tweetId}`, { content });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteTweet = async (tweetId) => {
    try {
        const response = await api.delete(`/tweets/${tweetId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
};

export default {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
};