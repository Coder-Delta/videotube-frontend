import axios from 'axios';
import { getAuthData } from "@/utils/cookie";

const API_URL = '/api/v1/likes';

const getAuthHeaders = () => {
    const { token } = getAuthData();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const toggleVideoLike = (videoId) => {
    return axios.post(`${API_URL}/toggle/v/${videoId}`, {}, {
        headers: getAuthHeaders()
    });
};

const toggleCommentLike = (commentId) => {
    return axios.post(`${API_URL}/toggle/c/${commentId}`, {}, {
        headers: getAuthHeaders()
    });
};

const toggleTweetLike = (tweetId) => {
    return axios.post(`${API_URL}/toggle/t/${tweetId}`, {}, {
        headers: getAuthHeaders()
    });
};

const getLikedVideos = () => {
    return axios.get(`${API_URL}/videos`, {
        headers: getAuthHeaders()
    });
};

export default {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
};
