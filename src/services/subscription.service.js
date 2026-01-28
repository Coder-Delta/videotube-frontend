import api from "@/utils/api";
import { getAuthData } from "@/utils/cookie";

/* ---------------- helpers ---------------- */
const getAuthHeaders = () => {
    const { token } = getAuthData();
    if (!token) throw new Error("Not authenticated");
    return { Authorization: `Bearer ${token}` };
};

/* ---------------- subscriptions ---------------- */

// Toggle subscription for a channel
const toggleSubscription = async (channelId) => {
    const response = await api.post(
        `/subscriptions/c/${channelId}`,
        {},
        { headers: getAuthHeaders() }
    );
    return response.data;
};

// Get list of channels a user is subscribed to
const getSubscribedChannels = async (subscriberId) => {
    const response = await api.get(
        `/subscriptions/u/${subscriberId}`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};

// Get list of subscribers of a channel
const getUserChannelSubscribers = async (channelId) => {
    const response = await api.get(
        `/subscriptions/c/${channelId}`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export default {
    toggleSubscription,
    getSubscribedChannels,
    getUserChannelSubscribers,
};