import axios from 'axios';
import { getAuthData } from "@/utils/cookie";

const API_URL = '/api/v1/subscriptions';

const getAuthHeaders = () => {
    const { token } = getAuthData();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Toggle subscription for a channel
const toggleSubscription = (channelId) => {
    return axios.post(`${API_URL}/c/${channelId}`, {}, {
        headers: getAuthHeaders()
    });
};

// Get list of subscribed channels for a user (subscriberId)
const getSubscribedChannels = (subscriberId) => {
    return axios.get(`${API_URL}/u/${subscriberId}`, {
        headers: getAuthHeaders()
    });
};

// Get list of subscribers for a channel (channelId)
const getUserChannelSubscribers = (channelId) => {
    return axios.get(`${API_URL}/c/${channelId}`, {
        headers: getAuthHeaders()
    });
};


export default {
    toggleSubscription,
    getSubscribedChannels,
    getUserChannelSubscribers
};
