<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
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
  <Transition name="page-fade">
    <Loader v-if="isLoading" />

    <div v-else class="app-root">
      <Navbar />

      <div class="main-layout">
        <Sidebar />

        <div class="scroller-area">
          <main class="content-view">
            <header class="content-header">
              <div class="header-line"></div>
              <h1 class="page-title">Recommended for You</h1>
              <p class="page-subtitle">Curated videos based on your recent activity</p>
            </header>

            <section class="video-grid">
              <div v-for="(video, index) in videos" :key="video.id" class="grid-item"
                :style="{ '--delay': `${index * 0.05}s` }">
                <VideoCard :id="video.id" :title="video.title" :channel="video.channel" :views="video.views"
                  :time="video.time" :duration="video.duration" />
              </div>
            </section>

            <Footer />
          </main>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

.app-root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0b0f1a;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #f8fafc;
  overflow: hidden;
}

.main-layout {
  display: flex;
  /* Creates the side-by-side columns */
  flex: 1;
  overflow: hidden;
  width: 100%;
}

.scroller-area {
  flex: 1;
  /* Takes up all remaining space to the right of sidebar */
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  background: radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.03) 0%, transparent 50%);
}

/* Custom Scrollbar */
.scroller-area::-webkit-scrollbar {
  width: 8px;
}

.scroller-area::-webkit-scrollbar-track {
  background: transparent;
}

.scroller-area::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.content-view {
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
}

.content-header {
  margin-bottom: 40px;
}

.header-line {
  width: 40px;
  height: 4px;
  background: #3b82f6;
  border-radius: 2px;
  margin-bottom: 12px;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(to right, #ffffff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.grid-item {
  animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: var(--delay);
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>