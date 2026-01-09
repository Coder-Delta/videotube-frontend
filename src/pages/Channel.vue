<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { CheckCircle2 } from "lucide-vue-next";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";

const route = useRoute();
const isLoading = ref(true);
const activeTab = ref("Videos");

const channel = ref({
  name: "",
  username: "",
  subscribers: "0",
  description: "",
  avatar: "",
  coverImage: "",
  videosCount: "0 videos"
});
const videos = ref([]);
const isOwner = ref(false);

const tabs = ["Videos", "Shorts", "Playlists", "Community", "About"];

onMounted(async () => {
  // 1. Determine Owner
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
  const targetUsername = route.params.username; // Should be passed via route

  // Simple check (adjust based on real API data e.g. using IDs)
  if (currentUser?.username === targetUsername) {
    isOwner.value = true;
  }

  // 2. Fetch/Simulate Data
  setTimeout(() => {
    // Mock data logic - replace with real API call
    const baseName = targetUsername || "Cholochitro.exe";

    channel.value = {
      name: isOwner.value && currentUser.fullName ? currentUser.fullName : baseName,
      username: "@" + (isOwner.value && currentUser.username ? currentUser.username : "unknown"),
      subscribers: "124K",
      description: "Visual storytelling through high-fidelity digital experiences.",
      // Use logged-in user's avatar if owner, else mock
      avatar: isOwner.value && currentUser?.avatar ? currentUser.avatar : "",
      coverImage: isOwner.value && currentUser?.coverImage ? currentUser.coverImage : "",
      videosCount: "142 videos"
    };

    videos.value = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Creative Video #${i + 1}`,
      channel: channel.value.name,
      views: "12K views",
      time: "1 day ago",
      duration: "12:00"
    }));

    isLoading.value = false;
  }, 600);
});
</script>

<template>
  <Loader v-if="isLoading" />

  <div v-else>
    <Navbar />

    <!-- Cover -->
    <div class="cover-container">
      <img v-if="channel.coverImage" :src="channel.coverImage" alt="Cover" class="cover-img" />
      <div v-else class="cover-placeholder"></div>
    </div>

    <main class="container">
      <!-- Header -->
      <header class="channel-header">
        <div class="avatar-col">
          <img v-if="channel.avatar" :src="channel.avatar" alt="Avatar" class="avatar-img" />
          <div v-else class="avatar-placeholder">{{ channel.name.charAt(0) }}</div>
        </div>

        <div class="info-col">
          <h1>{{ channel.name }}
            <CheckCircle2 :size="20" fill="var(--pico-primary)" color="var(--pico-background-color)" />
          </h1>
          <div class="meta">
            <span>{{ channel.username }}</span> • <span>{{ channel.subscribers }} subscribers</span> • <span>{{
              channel.videosCount }}</span>
          </div>
          <p class="desc">{{ channel.description }}</p>

          <div class="actions">
            <button v-if="!isOwner" class="subscribe-btn">Subscribe</button>
            <button v-else class="outline secondary" @click="$router.push('/profile')">Manage Channel</button>
          </div>
        </div>
      </header>

      <!-- Tabs -->
      <div class="tabs">
        <a v-for="tab in tabs" :key="tab" :class="{ active: activeTab === tab }" @click="activeTab = tab">{{ tab }}</a>
      </div>

      <!-- Content -->
      <div v-if="activeTab === 'Videos'" class="video-grid">
        <VideoCard v-for="video in videos" :key="video.id" v-bind="video" />
      </div>

      <div v-else class="empty-state">
        <p>No content in {{ activeTab }} yet.</p>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Minimalist & Clean Styles */
.cover-container {
  width: 100%;
  height: 200px;
  background: var(--pico-muted-border-color);
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #333, #444);
}

.channel-header {
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  align-items: flex-start;
}

.avatar-col img,
.avatar-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  background: var(--pico-card-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: var(--pico-primary);
  border: 2px solid var(--pico-muted-border-color);
}

.info-col h1 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
}

.meta {
  color: var(--pico-muted-color);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.desc {
  color: var(--pico-muted-color);
  font-size: 0.95rem;
  max-width: 600px;
  margin-bottom: 1rem;
}

.subscribe-btn {
  border-radius: 99px;
  padding: 0.5rem 1.5rem;
  width: auto;
  font-weight: 600;
}

.tabs {
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid var(--pico-muted-border-color);
  margin-bottom: 2rem;
}

.tabs a {
  padding: 0.75rem 0;
  cursor: pointer;
  color: var(--pico-muted-color);
  font-weight: 500;
  border-bottom: 2px solid transparent;
}

.tabs a:hover {
  color: var(--pico-color);
}

.tabs a.active {
  color: var(--pico-color);
  border-bottom-color: var(--pico-color);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding-bottom: 4rem;
}

.empty-state {
  padding: 4rem;
  text-align: center;
  color: var(--pico-muted-color);
}

@media (max-width: 768px) {
  .channel-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-col h1 {
    justify-content: center;
  }

  .cover-container {
    height: 120px;
  }

  .avatar-col img,
  .avatar-placeholder {
    width: 100px;
    height: 100px;
    margin-top: -50px;
    border: 4px solid var(--pico-background-color);
  }
}
</style>