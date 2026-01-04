<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";

const route = useRoute();
const isLoading = ref(true);

/* Channel info (mock for now) */
const channel = ref({
  name: route.params.username || "Videotube Channel",
  subscribers: "12.4K subscribers",
  description: "This is a demo channel description.",
});

/* Channel videos (mock data) */
const videos = ref(
  Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Channel Video ${i + 1}`,
    channel: channel.value.name,
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
        <!-- Channel Header -->
        <section class="channel-header">
          <div class="avatar"></div>

          <div class="channel-info">
            <h2>{{ channel.name }}</h2>
            <p class="subs">{{ channel.subscribers }}</p>
            <p class="desc">{{ channel.description }}</p>
          </div>

          <button class="subscribe-btn">Subscribe</button>
        </section>

        <!-- Tabs -->
        <nav class="channel-tabs">
          <button class="active">Videos</button>
          <button>Playlists</button>
          <button>About</button>
        </nav>

        <!-- Videos -->
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

/* Channel header */
.channel-header {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(15, 23, 42, 0.75);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #1e293b;
}

.channel-info {
  flex: 1;
}

.channel-info h2 {
  margin: 0;
}

.subs {
  font-size: 14px;
  color: #9ca3af;
}

.desc {
  font-size: 14px;
  margin-top: 6px;
  color: #cbd5f5;
}

.subscribe-btn {
  padding: 8px 16px;
  background: #dc2626;
  border: none;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.subscribe-btn:hover {
  background: #b91c1c;
}

/* Tabs */
.channel-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.channel-tabs button {
  background: none;
  border: none;
  padding: 10px 0;
  font-size: 14px;
  color: #94a3b8;
  cursor: pointer;
}

.channel-tabs button.active {
  color: #e5e7eb;
  border-bottom: 2px solid #60a5fa;
}

/* Grid */
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
