<script setup>
import { ref } from "vue";
import VideoControl from "@/components/video/VideoControls.vue";

defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: "" },
});

const videoRef = ref(null);
const isHovered = ref(false);
</script>

<template>
  <figure class="player-container">
    <video ref="videoRef" :src="src" :poster="poster" controls preload="metadata" playsinline></video>
  </figure>
</template>

<style scoped>
.player-container {
  margin: 0;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: var(--pico-border-radius);
  overflow: hidden;
  box-shadow: var(--pico-card-box-shadow);
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>