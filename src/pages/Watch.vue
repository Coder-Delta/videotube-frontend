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

const video = ref({
  id: route.params.id,
  src: "/sample-video.mp4",
  poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
  title: "Building Videotube with Vue 3 & Modern CSS",
  views: "24,132 views",
  date: "2 days ago",
  description: "Learn how to build a high-performance video streaming platform. We cover everything from architecture to glassmorphism UI.",
});

const suggestions = ref(
  Array.from({ length: 6 }, (_, i) => ({
    id: i + 101,
    title: `Next Level Vue 3 Architecture Part ${i + 1}`,
    channel: "Design Mastery",
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

  <div v-else class="app-root">
    <Navbar />

    <div class="main-layout">
      <Sidebar />

      <div class="scroller-area">
        <main class="content-view">
          <div class="watch-grid">
            
            <section class="video-column">
              <div class="player-container">
                <VideoPlayer :src="video.src" :poster="video.poster" />
              </div>
              
              <div class="description-card">
                <VideoDescription
                  :title="video.title"
                  :views="video.views"
                  :date="video.date"
                  :description="video.description"
                />
              </div>
            </section>

            <aside class="sidebar-column">
              <div class="section-header">
                <h3>Up next</h3>
                <span class="badge">Autoplay ON</span>
              </div>

              <div class="suggestions-list">
                <VideoCard
                  v-for="item in suggestions"
                  :key="item.id"
                  :id="item.id"
                  :title="item.title"
                  :channel="item.channel"
                  class="compact-card"
                />
              </div>
            </aside>
            
          </div>

          <Footer />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

/* Main Layout Containers */
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
  flex: 1;
  overflow: hidden;
  width: 100%;
}

.scroller-area {
  flex: 1;
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
  max-width: 1800px;
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
}

/* Watch Grid Layout */
.watch-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  align-items: start;
  margin-bottom: 40px;
}

/* Video Column Styling */
.video-column {
  width: 100%;
}

.player-container {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 
              0 0 0 1px rgba(59, 130, 246, 0.1);
  background: #000;
  position: relative;
  transition: box-shadow 0.3s ease;
}

.player-container:hover {
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8),
              0 0 0 1px rgba(59, 130, 246, 0.2);
}

.description-card {
  margin-top: 24px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Suggestions Column Styling */
.sidebar-column {
  position: sticky;
  top: 24px;
  max-height: calc(100vh - 88px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  scrollbar-width: thin;
  scrollbar-color: #334155 transparent;
}

.sidebar-column::-webkit-scrollbar {
  width: 6px;
}

.sidebar-column::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 10px;
}

.sidebar-column::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.section-header h3 {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.badge {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Customizing child components via deep selectors */
:deep(.compact-card) {
  background: transparent !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
  padding: 8px;
}

:deep(.compact-card:hover) {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.02) !important;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .watch-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar-column {
    position: relative;
    top: 0;
    max-height: none;
    margin-top: 24px;
  }
  
  .content-view {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .content-view {
    padding: 16px;
  }
  
  .watch-grid {
    gap: 20px;
  }
  
  .player-container {
    border-radius: 16px;
  }
  
  .description-card {
    border-radius: 16px;
    padding: 20px;
  }
  
  .sidebar-column {
    padding: 16px;
    border-radius: 16px;
  }
}
</style>