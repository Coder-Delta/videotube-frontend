<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import BaseLayout from "@/components/layout/BaseLayout.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoPlayer from "@/components/video/VideoPlayer.vue";
import VideoDescription from "@/components/video/VideoDescription.vue";
import Comments from "@/components/video/Comments.vue";
import SuggestionCard from "@/components/video/SuggestionCard.vue";

const route = useRoute();
const isLoading = ref(true);

const video = ref({
  id: route.params.id,
  src: "/sample-video.mp4",
  poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
  title: "Building Cholochitro.exe with Vue 3 & Modern CSS",
  views: "24,132 views",
  date: "2 days ago",
  description: "Learn how to build a high-performance video streaming platform. We cover everything from architecture to glassmorphism UI.",
});

const loadVideo = (id) => {
  isLoading.value = true;
  // Simulate API fetch delay and data update
  setTimeout(() => {
    video.value = {
      id: id,
      src: "/sample-video.mp4", // In a real app, this would change based on ID
      poster: `https://picsum.photos/seed/${id}/1280/720`,
      title: `Now Playing Video ID: ${id}`,
      views: `${Math.floor(Math.random() * 500) + 10}K views`,
      date: "Just now",
      description: `This is the description for the dynamically loaded video with ID ${id}. It demonstrates route monitoring and state updates.`
    };
    isLoading.value = false;
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 800);
};

// Initial load
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1200);
});

// Watch for route changes (clicking suggestions)
watch(
  () => route.params.id,
  (newId) => {
    if (newId) loadVideo(newId);
  }
);

const suggestions = ref(
  Array.from({ length: 15 }, (_, i) => ({
    id: i + 101,
    title: `Next Level Vue 3 Architecture Part ${i + 1}`,
    channel: "Design Mastery",
  }))
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
            :description="video.description" />
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
            :channel="item.channel" />
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