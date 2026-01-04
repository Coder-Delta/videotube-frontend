<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";
import VideoPlayer from "@/components/video/VideoPlayer.vue";
import VideoDescription from "@/components/video/VideoDescription.vue";
import VideoCard from "@/components/video/VideoCard.vue";


const route = useRoute();
const isLoading = ref(true);

/* Mock video data (replace with API later) */
const video = ref({
  id: route.params.id,
  src: "/sample-video.mp4",
  poster: "",
  title: "Building Videotube with Vue 3",
  views: "24,132 views",
  date: "2 days ago",
  description:
    "In this video, we build a YouTube-like platform using Vue 3 and pure CSS. This includes routing, layouts, reusable components, and clean architecture.",
});

/* Suggested videos */
const suggestions = ref(
  Array.from({ length: 6 }, (_, i) => ({
    id: i + 101,
    title: `Suggested Video ${i + 1}`,
    channel: "Another Channel",
  }))
);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});
</script>

<template>
  <Loader v-if="isLoading" />

  <div v-else class="page">
    <!-- Navbar -->
    <Navbar />

    <div class="layout">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <main class="content">
        <div class="watch-layout">
          <!-- Left: Video -->
          <section class="video-section">
            <VideoPlayer
              :src="video.src"
              :poster="video.poster"
            />

            <VideoDescription
              :title="video.title"
              :views="video.views"
              :date="video.date"
              :description="video.description"
            />
          </section>

          <!-- Right: Suggestions -->
          <aside class="suggestions">
            <h3>Up next</h3>

            <div class="suggest-grid">
              <VideoCard
                v-for="item in suggestions"
                :key="item.id"
                :id="item.id"
                :title="item.title"
                :channel="item.channel"
              />
            </div>
          </aside>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0a0e1a, #1a1f3a);
  color: #e5e7eb;
}

.layout {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  padding: 32px;
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Watch layout */
.watch-layout {
  display: flex;
  gap: 24px;
}

/* Left */
.video-section {
  flex: 3;
}

/* Right */
.suggestions {
  flex: 1.4;
}

.suggestions h3 {
  margin-bottom: 12px;
}

/* Suggestion grid */
.suggest-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Responsive */
@media (max-width: 900px) {
  .watch-layout {
    flex-direction: column;
  }

  .suggestions {
    margin-top: 24px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
