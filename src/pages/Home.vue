<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import BaseLayout from "@/components/layout/BaseLayout.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";

const isLoading = ref(true);
const videos = ref([]);
const error = ref(null);

import { getAuthData } from "@/utils/cookie";

const fetchVideos = async () => {
  error.value = null;
  try {
    const { token } = getAuthData();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get('/api/v1/videos', { headers });
    console.log("Videos API Response:", response.data);

    let videoList = [];
    const data = response.data;

    if (Array.isArray(data)) {
      videoList = data;
    } else if (data && Array.isArray(data.data)) {
      videoList = data.data;
    } else if (data && data.data && Array.isArray(data.data.videos)) {
      // Specific handling for current API structure
      videoList = data.data.videos;
    } else if (data && data.data && Array.isArray(data.data.docs)) {
      videoList = data.data.docs;
    } else if (data && Array.isArray(data.docs)) {
      videoList = data.docs;
    }

    videos.value = videoList.map(video => ({
      id: video._id,
      title: video.title,
      thumbnail: video.thumbnail,
      channel: video.owner?.username || "Cholochitro User",
      // views removed
      time: new Date(video.createdAt).toLocaleDateString(),
      duration: video.duration ? (video.duration / 60).toFixed(2) : "00:00"
    }));
  } catch (err) {
    console.error("Failed to fetch videos:", err);
    error.value = "Failed to load videos. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchVideos();
});
</script>

<template>
  <Loader v-if="isLoading" />
  <BaseLayout v-else>
    <hgroup>
      <h3>Recommended for You</h3>
      <p>Curated videos based on your recent activity</p>
    </hgroup>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="videos.length === 0" class="empty-state">
      <p>No videos found. Check back later or upload one!</p>
    </div>

    <div v-else class="grid">
      <div v-for="video in videos" :key="video.id">
        <VideoCard :id="video.id" :title="video.title" :thumbnail="video.thumbnail" :channel="video.channel"
          :time="video.time" :duration="video.duration" />
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.error-message {
  color: var(--pico-del-color);
  text-align: center;
  padding: 2rem;
  background: rgba(var(--pico-del-color-rgb), 0.1);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--pico-muted-color);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding-bottom: 2rem;
  animation: fadeIn 0.5s ease-out;
}

@media (max-width: 576px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>