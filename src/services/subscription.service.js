import api from "@/utils/api";
import { getAuthData } from "@/utils/cookie";

/* -------------------- helpers -------------------- */
const getAuthHeaders = () => {
    const { token } = getAuthData();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/* -------------------- subscriptions -------------------- */

// Toggle subscription for a channel
const toggleSubscription = (channelId) => {
    return api.post(
        `/subscriptions/c/${channelId}`,
        {},
        {
            headers: getAuthHeaders(),
        }
    );
};

// Get list of subscribed channels for a user (subscriberId)
const getSubscribedChannels = (subscriberId) => {
    return api.get(`/subscriptions/u/${subscriberId}`, {
        headers: getAuthHeaders(),
    });
};

// Get list of subscribers for a channel (channelId)
const getUserChannelSubscribers = (channelId) => {
    return api.get(`/subscriptions/c/${channelId}`, {
        headers: getAuthHeaders(),
    });
};

export default {
    toggleSubscription,
    getSubscribedChannels,
    getUserChannelSubscribers,
};