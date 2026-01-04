<script setup>
import { ref } from "vue";
import { ChevronDown, ChevronUp, Hash } from "lucide-vue-next";

const props = defineProps({
  title: { type: String, required: true },
  views: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, default: () => ['#streaming', '#video', '#tech'] }
});

const expanded = ref(false);
const toggle = () => { expanded.value = !expanded.value; };
</script>

<template>
  <section class="video-info-card">
    <h1 class="video-headline">{{ title }}</h1>

    <div class="meta-container" @click="toggle">
      <div class="stats-group">
        <span class="stat-item">{{ views }} views</span>
        <span class="stat-dot"></span>
        <span class="stat-item">{{ date }}</span>
      </div>
      
      <div class="tag-cloud" v-if="!expanded">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>

    <div class="content-wrapper" :class="{ 'is-expanded': expanded }">
      <div class="description-text">
        {{ description }}
      </div>
      
      <div class="content-fade" v-if="!expanded"></div>
    </div>

    <button class="expand-action" @click="toggle">
      <span class="action-text">{{ expanded ? "Show less" : "...more" }}</span>
      <component :is="expanded ? ChevronUp : ChevronDown" :size="16" class="action-icon" />
    </button>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

.video-info-card {
  --bg-soft: rgba(255, 255, 255, 0.04);
  --bg-hover: rgba(255, 255, 255, 0.08);
  --accent-blue: #3b82f6;
  
  margin-top: 20px;
  padding: 20px;
  background: var(--bg-soft);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.video-info-card:hover {
  background: var(--bg-hover);
}

/* Typography: The Headline */
.video-headline {
  margin: 0 0 12px 0;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.3;
  color: #ffffff;
  letter-spacing: -0.02em;
}

/* The Meta Bar */
.meta-container {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-bottom: 12px;
}

.stats-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-item {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.stat-dot {
  width: 4px;
  height: 4px;
  background: #475569;
  border-radius: 50%;
}

/* Tag Styles (Pretty Words) */
.tag-cloud {
  display: flex;
  gap: 8px;
  animation: fadeIn 0.4s ease;
}

.tag {
  color: var(--accent-blue);
  font-size: 14px;
  font-weight: 600;
}

/* Description Text Architecture */
.content-wrapper {
  position: relative;
  max-height: 4.8em; /* Exactly 3 lines */
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-wrapper.is-expanded {
  max-height: 1000px; /* Large enough for any description */
}

.description-text {
  font-size: 14px;
  line-height: 1.6;
  color: #cbd5e1;
  white-space: pre-wrap; /* Preserves line breaks in description */
}

/* The "Pretty" Fade Out */
.content-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to top, #161c2b 0%, transparent 100%);
  pointer-events: none;
}

/* Interactive Action Button */
.expand-action {
  margin-top: 12px;
  background: none;
  border: none;
  padding: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;
}

.expand-action:hover {
  color: var(--accent-blue);
}

.action-icon {
  transition: transform 0.3s ease;
}

.expand-action:hover .action-icon {
  transform: translateY(2px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-5px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>