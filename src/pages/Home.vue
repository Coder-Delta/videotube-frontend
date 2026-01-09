<script setup>
import { ref, onMounted } from "vue";
import BaseLayout from "@/components/layout/BaseLayout.vue";
import Loader from "@/components/common/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";

const isLoading = ref(true);

const videos = ref(
  Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Premium Creative Content: Episode ${i + 1}`,
    channel: "Design Studio",
    views: `${Math.floor(Math.random() * 100) + 1}K`,
    time: `${i + 1} hours ago`,
    duration: `${Math.floor(Math.random() * 10) + 5}:20`
  }))
);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1800);
});
</script>

<template>
  <Loader v-if="isLoading" />
  <BaseLayout v-else>
    <hgroup>
      <h1>Recommended for You</h1>
      <p>Curated videos based on your recent activity</p>
    </hgroup>
    <div class="grid">
      <div v-for="video in videos" :key="video.id">
        <VideoCard :id="video.id" :title="video.title" :channel="video.channel" :views="video.views" :time="video.time"
          :duration="video.duration" />
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>