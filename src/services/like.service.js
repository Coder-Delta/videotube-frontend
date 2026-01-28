import api from "@/utils/api";
import { getAuthData } from "@/utils/cookie";

/* helpers */
const getAuthHeaders = () => {
  const { token } = getAuthData();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* likes */
const toggleVideoLike = (videoId) =>
  api.post(`/likes/toggle/v/${videoId}`, {}, { headers: getAuthHeaders() });

const toggleCommentLike = (commentId) =>
  api.post(`/likes/toggle/c/${commentId}`, {}, { headers: getAuthHeaders() });

const toggleTweetLike = (tweetId) =>
  api.post(`/likes/toggle/t/${tweetId}`, {}, { headers: getAuthHeaders() });

const getLikedVideos = () =>
  api.get(`/likes/videos`, { headers: getAuthHeaders() });

export default {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos,
};