<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BaseLayout from "@/components/layout/BaseLayout.vue";
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
  <BaseLayout v-else>
    <div class="grid">
      <section>
        <VideoPlayer :src="video.src" :poster="video.poster" />
        <div class="description-card">
          <VideoDescription :title="video.title" :views="video.views" :date="video.date"
            :description="video.description" />
        </div>
      </section>

      <aside>
        <article>
          <header>
            <hgroup>
              <h3>Up next</h3>
              <small>Autoplay ON</small>
            </hgroup>
          </header>

          <div class="suggestions-list">
            <VideoCard v-for="item in suggestions" :key="item.id" :id="item.id" :title="item.title"
              :channel="item.channel" class="compact-card" />
          </div>
        </article>
      </aside>
    </div>
  </BaseLayout>
</template>

<style scoped>
.grid {
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

@media (max-width: 992px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>