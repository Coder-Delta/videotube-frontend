<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  views: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const expanded = ref(false);

const toggle = () => {
  expanded.value = !expanded.value;
};
</script>

<template>
  <section class="description-box">
    <!-- Title -->
    <h2 class="title">{{ title }}</h2>

    <!-- Meta -->
    <div class="meta">
      <span>{{ views }}</span>
      <span class="dot">•</span>
      <span>{{ date }}</span>
    </div>

    <!-- Description -->
    <div
      class="description"
      :class="{ expanded: expanded }"
    >
      {{ description }}
    </div>

    <!-- Toggle -->
    <button class="toggle-btn" @click="toggle">
      {{ expanded ? "Show less" : "Show more" }}
    </button>
  </section>
</template>

<style scoped>
.description-box {
  margin-top: 16px;
  padding: 14px;
  background: #0f172a;
  border-radius: 8px;
  color: #e5e7eb;
}

/* Title */
.title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 600;
}

/* Meta */
.meta {
  font-size: 13px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.dot {
  font-size: 10px;
}

/* Description text */
.description {
  font-size: 14px;
  line-height: 1.6;
  color: #cbd5f5;

  /* collapse */
  max-height: 60px;
  overflow: hidden;
  transition: max-height 0.25s ease;
}

.description.expanded {
  max-height: 500px;
}

/* Toggle */
.toggle-btn {
  margin-top: 6px;
  background: none;
  border: none;
  color: #60a5fa;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
}

.toggle-btn:hover {
  text-decoration: underline;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .description {
    transition: none;
  }
}
</style>
