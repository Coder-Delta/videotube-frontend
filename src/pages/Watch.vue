<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';
import BaseLayout from "@/components/layout/BaseLayout.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoPlayer from "@/components/video/VideoPlayer.vue";
import VideoDescription from "@/components/video/VideoDescription.vue";
import Comments from "@/components/video/Comments.vue";
import SuggestionCard from "@/components/video/SuggestionCard.vue";

const route = useRoute();
const isLoading = ref(true);
const video = ref(null);
const error = ref(null);

const suggestions = ref([]);
const fetchVideoDetails = async (id) => {
  isLoading.value = true;
  error.value = null;
  try {
    const token = localStorage.getItem('accessToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // First, fetch the video details
    const response = await axios.get(`/api/v1/videos/${id}`, { headers });
    const videoData = response.data.data || response.data;

    // Use videoFile for src. Assuming backend returns the full Cloudinary URL.
    video.value = {
      id: videoData._id,
      src: videoData.videoFile,
      poster: videoData.thumbnail,
      title: videoData.title,
      views: videoData.views ? `${videoData.views} views` : "0 views",
      date: new Date(videoData.createdAt).toLocaleDateString(),
      description: videoData.description,
      channel: {
        name: videoData.owner?.fullName || videoData.owner?.username || "Unknown Channel",
        username: videoData.owner?.username || "unknown",
        avatar: videoData.owner?.avatar || "",
        subscribers: "0 Subscribers" // API might not providing this yet
      }
    };

    // Fetch suggestions (all videos)
    const suggestionsResponse = await axios.get('/api/v1/videos', { headers });
    // Handle different response structures for suggestions list
    const sData = suggestionsResponse.data;
    let allVideos = [];
    if (Array.isArray(sData)) allVideos = sData;
    else if (sData.data && Array.isArray(sData.data)) allVideos = sData.data;
    else if (sData.data && sData.data.videos && Array.isArray(sData.data.videos)) allVideos = sData.data.videos;
    else if (sData.data && sData.data.docs && Array.isArray(sData.data.docs)) allVideos = sData.data.docs;

    // Filter out current video and map
    suggestions.value = allVideos
      .filter(v => v._id !== id)
      .map(v => ({
        id: v._id,
        title: v.title,
        channel: v.owner?.username || "Cholochitro User",
        views: v.views ? `${v.views} views` : "0 views",
        time: new Date(v.createdAt).toLocaleDateString(),
        duration: v.duration ? (v.duration / 60).toFixed(2) : "00:00",
        thumbnail: v.thumbnail
      }));

  } catch (err) {
    console.error("Failed to load video:", err);
    error.value = "Failed to load video.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (route.params.id) {
    fetchVideoDetails(route.params.id);
  }
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchVideoDetails(newId);
  }
);
</script>

<template>
  <Loader v-if="isLoading" />
  <BaseLayout v-else>
    <div class="grid">
      <section>
        <VideoPlayer :src="video.src" :poster="video.poster" />
        <div class="description-card">
          <VideoDescription :title="video.title" :views="video.views" :date="video.date"
            :description="video.description" :channel="video.channel" />
        </div>
        <Comments />
      </section>

      <div class="sidebar-suggestions">
        <header class="suggestions-header">
          <strong>Up Next</strong>
          <label class="autoplay-toggle">
            Autoplay
            <input type="checkbox" role="switch" checked />
          </label>
        </header>

        <div class="suggestions-list">
          <SuggestionCard v-for="item in suggestions" :key="item.id" :id="item.id" :title="item.title"
            :thumbnail="item.thumbnail" :channel="item.channel" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.grid {
  grid-template-columns: 2.5fr 1fr;
  gap: 1.5rem;
}

.suggestions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.autoplay-toggle {
  margin-bottom: 0;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--pico-muted-color);
  font-weight: 600;
}



@media (max-width: 992px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>