<script setup>
import { ref, onMounted } from "vue";
import api from "@/utils/api";
import BaseLayout from "@/components/layout/BaseLayout.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";

const isLoading = ref(true);
const videos = ref([]);
const error = ref(null);

const fetchVideos = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await api.get("/videos");

    const payload = response?.data?.data;

    const videoList =
      payload?.videos ||
      payload?.docs ||
      payload ||
      [];

    videos.value = Array.isArray(videoList)
      ? videoList.map(video => ({
        id: video._id,
        title: video.title,
        thumbnail: video.thumbnail,
        channel: video.owner?.username || "Cholochitro User",
        time: video.createdAt
          ? new Date(video.createdAt).toLocaleDateString()
          : "",
        // ✅ FIX 2: PASS RAW SECONDS (NO STRING FORMATTING HERE)
        duration: Number(video.duration) || 0
      }))
      : [];
  } catch (err) {
    console.error("Video API Error:", err);
    error.value =
      err.response?.data?.message ||
      err.message ||
      "Failed to load videos";
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchVideos);
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