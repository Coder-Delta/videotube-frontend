<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";

const isLoading = ref(true);
const router = useRouter();

const goToWatch = (id) => {
  router.push(`/watch/${id}`);
};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});
</script>

<template>
  <Loader v-if="isLoading" />

  <div v-else class="page">
    <Navbar />

    <div class="layout">
      <Sidebar />

      <main class="content">
        <h1>Recommended Videos</h1>

        <section class="video-grid">
          <div
            v-for="n in 8"
            :key="n"
            class="video-card"
            @click="goToWatch(n)"
          >
            <div class="thumbnail"></div>
            <h3>Sample Video {{ n }}</h3>
            <p>Channel Name</p>
          </div>
        </section>
      </main>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
/* Page */
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

/* Fade-in */
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

/* Grid */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

/* Card */
.video-card {
  background: rgba(15, 23, 42, 0.75);
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid rgba(148, 163, 184, 0.12);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* Backdrop fallback */
@supports (backdrop-filter: blur(10px)) {
  .video-card {
    backdrop-filter: blur(10px);
  }
}

.video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(96, 165, 250, 0.18);
}

/* Thumbnail */
.thumbnail {
  height: 160px;
  background: linear-gradient(135deg, #1e293b, #334155);
}

/* Text */
.video-card h3 {
  font-size: 15px;
  padding: 12px 14px 6px;
  margin: 0;
  color: #f1f5f9;
}

.video-card p {
  font-size: 13px;
  padding: 0 14px 14px;
  margin: 0;
  color: #94a3b8;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
