import api from "@/utils/api.js";

const toggleSubscription = async (channelId) => {
    try {
        const response = await api.post(`/subscriptions/c/${channelId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUserChannelSubscribers = async (channelId) => {
    try {
        const response = await api.get(`/subscriptions/c/${channelId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getSubscribedChannels = async (subscriberId) => {
    try {
        const response = await api.get(`/subscriptions/u/${subscriberId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
};
