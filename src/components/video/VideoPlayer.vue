<script setup>
import { ref } from "vue";
import VideoControl from "@/components/video/VideoControls.vue";

/**
 * Props
 */
defineProps({
  src: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: "",
  },
});

const videoRef = ref(null);
</script>

<template>
  <section class="video-player-wrapper">
    <!-- Video -->
    <video
      ref="videoRef"
      class="video"
      :src="src"
      :poster="poster"
      preload="metadata"
    ></video>

    <!-- Custom Controls -->
    <VideoControl :videoRef="videoRef" />
  </section>
</template>

<style scoped>
.video-player-wrapper {
  width: 100%;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

/* Video element */
.video {
  width: 100%;
  max-height: 480px;
  background: #000;
  display: block;
}

/* Mobile */
@media (max-width: 768px) {
  .video {
    max-height: 260px;
  }
}
</style>
