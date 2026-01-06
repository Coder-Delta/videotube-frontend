<script setup>
import { useRouter } from "vue-router";
import { Play, MoreVertical, CheckCircle2 } from "lucide-vue-next";

const props = defineProps({
  id: { type: [String, Number], required: true },
  title: { type: String, required: true },
  channel: { type: String, required: true },
  views: { type: String, default: "1.2M views" },
  time: { type: String, default: "2 days ago" },
  duration: { type: String, default: "12:45" }
});

const router = useRouter();
const goToWatch = () => router.push(`/watch/${props.id}`);
</script>

<template>
  <article class="video-card" @click="goToWatch">
    <div class="thumbnail-wrapper">
      <div class="thumbnail-image"></div>
      <div class="duration-tag">{{ duration }}</div>
      <div class="play-overlay">
        <div class="play-icon-bg">
          <Play :size="24" fill="currentColor" />
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="channel-avatar">
        {{ channel.charAt(0) }}
      </div>
      
      <div class="text-meta">
        <div class="title-row">
          <h3 class="video-title">{{ title }}</h3>
          <button class="more-btn"><MoreVertical :size="16" /></button>
        </div>
        
        <div class="channel-row">
          <span class="channel-name">{{ channel }}</span>
          <CheckCircle2 :size="12" class="verified-icon" />
        </div>
        
        <div class="stats-row">
          <span>{{ views }}</span>
          <span class="dot-separator"></span>
          <span>{{ time }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');

.video-card {
  --card-bg: #111827;
  --accent: #3b82f6;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  
  width: 100%;
  cursor: pointer;
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(255, 255, 255, 0.03);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.video-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(59, 130, 246, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 
              0 0 20px rgba(59, 130, 246, 0.05);
}

/* Thumbnail Architecture */
.thumbnail-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #1f2937;
  overflow: hidden;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  transition: transform 0.6s ease;
}

.video-card:hover .thumbnail-image {
  transform: scale(1.1);
}

.duration-tag {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-icon-bg {
  width: 50px;
  height: 50px;
  background: var(--accent);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.video-card:hover .play-icon-bg {
  transform: scale(1);
}

/* Content Architecture */
.content-container {
  display: flex;
  gap: 12px;
  padding: 16px;
}

.channel-avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  flex-shrink: 0;
}

.text-meta {
  flex: 1;
  min-width: 0; /* Ensures clamping works */
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.video-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.4;
  margin: 0;
  /* Line Clamping */
  display: -webkit-box;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.more-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 2px;
  opacity: 0;
  transition: opacity 0.2s;
}

.video-card:hover .more-btn {
  opacity: 1;
}

.channel-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
}

.channel-name {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.verified-icon {
  color: var(--accent);
}

.stats-row {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
  display: flex;
  align-items: center;
}

.dot-separator::before {
  content: "•";
  margin: 0 6px;
}
</style>