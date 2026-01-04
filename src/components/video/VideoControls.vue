<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

/**
 * Props
 * videoRef → ref of the <video> element from parent
 */
const props = defineProps({
  videoRef: {
    type: Object,
    required: true,
  },
});

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);

/* Helpers */
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/* Controls */
const togglePlay = () => {
  const video = props.videoRef.value;
  if (!video) return;

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const seek = (e) => {
  const video = props.videoRef.value;
  if (!video) return;

  video.currentTime = e.target.value;
};

const changeVolume = (e) => {
  const video = props.videoRef.value;
  if (!video) return;

  volume.value = e.target.value;
  video.volume = volume.value;
};

const toggleFullscreen = () => {
  const video = props.videoRef.value;
  if (!video) return;

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
};

/* Sync video state */
const onPlay = () => (isPlaying.value = true);
const onPause = () => (isPlaying.value = false);
const onTimeUpdate = () => {
  currentTime.value = props.videoRef.value.currentTime;
};
const onLoaded = () => {
  duration.value = props.videoRef.value.duration;
};

onMounted(() => {
  const video = props.videoRef.value;
  if (!video) return;

  video.addEventListener("play", onPlay);
  video.addEventListener("pause", onPause);
  video.addEventListener("timeupdate", onTimeUpdate);
  video.addEventListener("loadedmetadata", onLoaded);
});

onBeforeUnmount(() => {
  const video = props.videoRef.value;
  if (!video) return;

  video.removeEventListener("play", onPlay);
  video.removeEventListener("pause", onPause);
  video.removeEventListener("timeupdate", onTimeUpdate);
  video.removeEventListener("loadedmetadata", onLoaded);
});
</script>

<template>
  <div class="controls">
    <!-- Play / Pause -->
    <button class="btn" @click="togglePlay">
      {{ isPlaying ? "⏸" : "▶" }}
    </button>

    <!-- Time -->
    <span class="time">
      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
    </span>

    <!-- Progress -->
    <input
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      :value="currentTime"
      @input="seek"
      class="progress"
    />

    <!-- Volume -->
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      v-model="volume"
      @input="changeVolume"
      class="volume"
    />

    <!-- Fullscreen -->
    <button class="btn" @click="toggleFullscreen">⛶</button>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: rgba(15, 23, 42, 0.85);
  border-radius: 8px;
  margin-top: 8px;
}

/* Buttons */
.btn {
  background: none;
  border: none;
  color: #e5e7eb;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  color: #60a5fa;
}

/* Time */
.time {
  font-size: 12px;
  color: #cbd5f5;
  min-width: 90px;
}

/* Progress */
.progress {
  flex: 1;
}

/* Volume */
.volume {
  width: 80px;
}

/* Range styling */
input[type="range"] {
  accent-color: #60a5fa;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
</style>
