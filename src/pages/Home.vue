<script setup>
import { ref, onMounted } from "vue";

import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";

const isLoading = ref(true);

/* Mock video data (replace with API later) */
const videos = ref(
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Sample Video ${i + 1}`,
    channel: "Channel Name",
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
        <h1>Recommended Videos</h1>

        <section class="video-grid">
          <VideoCard
            v-for="video in videos"
            :key="video.id"
            :id="video.id"
            :title="video.title"
            :channel="video.channel"
          />
        </section>
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

.content h1 {
  margin-bottom: 28px;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Grid layout stays in page */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
