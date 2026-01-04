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
  <section 
    class="player-frame" 
    @mouseenter="isHovered = true" 
    @mouseleave="isHovered = false"
  >
    <div class="ambient-glow"></div>

    <div class="video-container">
      <video
        ref="videoRef"
        class="main-video"
        :src="src"
        :poster="poster"
        preload="metadata"
        playsinline
      ></video>

      <Transition name="fade">
        <div v-show="isHovered" class="controls-overlay">
          <VideoControl :videoRef="videoRef" />
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.player-frame {
  position: relative;
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 1. The Ambient Glow Effect */
.ambient-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
}

/* 2. The Main Container */
.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 24px; /* More rounded for a premium feel */
  overflow: hidden;
  z-index: 1;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.05); /* Subtle rim light */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 3. The Video Style */
.main-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 4. The Overlay Architecture */
.controls-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%);
  pointer-events: none; /* Allow clicks through to video unless on buttons */
}

/* Deep CSS magic to ensure controls remain clickable inside the overlay */
.controls-overlay :deep(.controls) {
  pointer-events: auto;
  margin: 0 15px 15px 15px; /* Adds space so controls don't touch edges */
}

/* 5. Smooth Fade Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Scaling */
@media (max-width: 1024px) {
  .video-container { border-radius: 16px; }
}

@media (max-width: 640px) {
  .video-container { border-radius: 0; }
  .player-frame { margin: 0; }
}
</style>