<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { CheckCircle2, Bell, Share2 } from "lucide-vue-next";

import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";

const route = useRoute();
const isLoading = ref(true);

const channel = ref({
  name: route.params.username || "Videotube Creative",
  subscribers: "124K",
  description: "Visual storytelling through high-fidelity digital experiences. Join our journey in crafting the future of the web.",
  videosCount: "142 videos"
});

const videos = ref(
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Cinematic Production Episode ${i + 1}`,
    channel: channel.value.name,
    views: "45K views",
    time: "3 days ago",
    duration: "10:24"
  }))
);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1200);
});
</script>

<template>
  <Loader v-if="isLoading" />

  <div v-else class="page-container">
    <Navbar />

    <div class="layout-main">
      <Sidebar />

      <main class="channel-view">
        <header class="channel-hero">
          <div class="banner-gradient"></div>
          
          <div class="header-content">
            <div class="avatar-glow">
              <div class="avatar-large">{{ channel.name.charAt(0) }}</div>
            </div>

            <div class="info-block">
              <div class="name-row">
                <h1 class="channel-name">{{ channel.name }}</h1>
                <CheckCircle2 :size="20" class="verified-icon" />
              </div>
              
              <div class="meta-row">
                <span class="meta-bold">@{{ channel.name.toLowerCase().replace(/\s/g, '') }}</span>
                <span class="dot"></span>
                <span>{{ channel.subscribers }} subscribers</span>
                <span class="dot"></span>
                <span>{{ channel.videosCount }}</span>
              </div>
              
              <p class="channel-desc">{{ channel.description }}</p>
            </div>

            <div class="action-stack">
              <button class="btn-subscribe">Subscribe</button>
              <div class="btn-group-row">
                <button class="btn-icon-outline"><Bell :size="18" /></button>
                <button class="btn-icon-outline"><Share2 :size="18" /></button>
              </div>
            </div>
          </div>
        </header>

        <nav class="navigation-tabs">
          <button class="tab-item active">Videos</button>
          <button class="tab-item">Shorts</button>
          <button class="tab-item">Playlists</button>
          <button class="tab-item">Community</button>
          <button class="tab-item">About</button>
        </nav>

        <section class="video-grid">
          <div 
            v-for="(video, index) in videos" 
            :key="video.id"
            class="grid-animation-wrapper"
            :style="{ '--delay': `${index * 0.05}s` }"
          >
            <VideoCard
              :id="video.id"
              :title="video.title"
              :channel="video.channel"
              :views="video.views"
              :time="video.time"
              :duration="video.duration"
            />
          </div>
        </section>

        <Footer />
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.page-container {
  min-height: 100vh;
  background-color: #0b0f1a;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.layout-main {
  display: flex;
}

.channel-view {
  flex: 1;
  padding: 0 40px 40px 40px;
  /* Adjust based on Sidebar width */
  margin-left: 0; 
  transition: all 0.4s ease;
}

/* Header & Banner Style */
.channel-hero {
  position: relative;
  padding: 60px 0 40px;
  margin-bottom: 20px;
}

.banner-gradient {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 180px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 0 0 24px 24px;
  opacity: 0.5;
}

.header-content {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 32px;
  z-index: 2;
}

.avatar-glow {
  padding: 6px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
}

.avatar-large {
  width: 128px;
  height: 128px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  border: 4px solid #0b0f1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 800;
  color: white;
}

.info-block {
  flex: 1;
  padding-bottom: 10px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.channel-name {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0;
}

.verified-icon {
  color: #3b82f6;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #94a3b8;
  font-size: 15px;
  margin-bottom: 12px;
}

.meta-bold {
  color: #fff;
  font-weight: 600;
}

.dot {
  width: 4px;
  height: 4px;
  background: #334155;
  border-radius: 50%;
}

.channel-desc {
  max-width: 600px;
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
}

/* Actions */
.action-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 10px;
}

.btn-subscribe {
  padding: 12px 32px;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-subscribe:hover {
  background: #e2e8f0;
  transform: scale(1.05);
}

.btn-group-row {
  display: flex;
  gap: 8px;
}

.btn-icon-outline {
  flex: 1;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon-outline:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Tabs Navigation */
.navigation-tabs {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 32px;
}

.tab-item {
  background: none;
  border: none;
  padding: 12px 0;
  color: #64748b;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

.tab-item.active {
  color: #fff;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #fff;
}

.tab-item:hover {
  color: #fff;
}

/* Video Grid Animation */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.grid-animation-wrapper {
  opacity: 0;
  animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .header-content { flex-direction: column; align-items: center; text-align: center; }
  .action-stack { width: 100%; }
  .channel-view { padding: 20px; }
}
</style>