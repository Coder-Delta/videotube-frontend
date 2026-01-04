<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { 
  Play, Pause, Volume2, VolumeX, 
  Maximize, Minimize, Settings, 
  SkipForward, SkipBack 
} from "lucide-vue-next";

const props = defineProps({
  videoRef: { type: Object, required: true },
});

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(0.8);
const isMuted = ref(false);

const formatTime = (time) => {
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = Math.floor(time % 60);
  return h > 0 
    ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m}:${s.toString().padStart(2, "0")}`;
};

const progressPercent = computed(() => (currentTime.value / duration.value) * 100 || 0);

/* Core Actions */
const togglePlay = () => {
  const v = props.videoRef.value;
  v?.paused ? v.play() : v.pause();
};

const seek = (e) => {
  if (props.videoRef.value) props.videoRef.value.currentTime = e.target.value;
};

const toggleMute = () => {
  isMuted.value = !isMuted.value;
  if (props.videoRef.value) props.videoRef.value.muted = isMuted.value;
};

const toggleFullscreen = () => {
  const v = props.videoRef.value;
  if (!document.fullscreenElement) v?.requestFullscreen();
  else document.exitFullscreen();
};

/* Video Event Listeners */
const syncState = () => {
  const v = props.videoRef.value;
  if (!v) return;
  isPlaying.value = !v.paused;
  currentTime.value = v.currentTime;
  duration.value = v.duration;
};

onMounted(() => {
  const v = props.videoRef.value;
  v?.addEventListener("timeupdate", syncState);
  v?.addEventListener("play", syncState);
  v?.addEventListener("pause", syncState);
  v?.addEventListener("loadedmetadata", syncState);
});
</script>

<template>
  <div class="player-overlay">
    <div class="controls-gradient"></div>

    <div class="controls-content">
      <div class="scrubber-container">
        <div class="progress-bg">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <input 
          type="range" min="0" :max="duration" step="0.1" 
          :value="currentTime" @input="seek" class="scrubber-input"
        />
      </div>

      <div class="buttons-row">
        <div class="left-group">
          <button class="icon-btn main-play" @click="togglePlay">
            <component :is="isPlaying ? Pause : Play" :size="24" fill="currentColor" />
          </button>
          
          <button class="icon-btn"><SkipForward :size="20" fill="currentColor" /></button>
          
          <div class="volume-group">
            <button class="icon-btn" @click="toggleMute">
              <component :is="isMuted || volume === 0 ? VolumeX : Volume2" :size="20" />
            </button>
            <input type="range" min="0" max="1" step="0.01" v-model="volume" class="volume-slider" />
          </div>

          <div class="time-display">
            <span class="current">{{ formatTime(currentTime) }}</span>
            <span class="separator">/</span>
            <span class="total">{{ formatTime(duration) }}</span>
          </div>
        </div>

        <div class="right-group">
          <button class="icon-btn"><Settings :size="20" /></button>
          <button class="icon-btn" @click="toggleFullscreen">
            <Maximize :size="20" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');

.player-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 20px 20px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: white;
  z-index: 10;
}

.controls-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  pointer-events: none;
}

.controls-content {
  position: relative;
  z-index: 11;
}

/* Scrubber Styling */
.scrubber-container {
  position: relative;
  height: 4px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.progress-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.scrubber-input {
  position: absolute;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

/* Buttons and Layout */
.buttons-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-group, .right-group, .volume-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

.main-play:active {
  transform: scale(0.9);
}

/* Time Typography - The "Pretty" Part */
.time-display {
  font-family: 'JetBrains Mono', monospace; /* Monospaced keeps numbers from jumping */
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.5px;
  display: flex;
  gap: 4px;
}

.separator {
  opacity: 0.5;
}

/* Volume Slider */
.volume-slider {
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;
  accent-color: white;
}

.volume-group:hover .volume-slider {
  width: 80px;
  opacity: 1;
}

input[type="range"] {
  cursor: pointer;
}
</style>