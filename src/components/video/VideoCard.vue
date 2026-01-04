<script setup>
import { useRouter } from "vue-router";

/**
 * Props expected from parent
 */
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const goToWatch = () => {
  router.push(`/watch/${props.id}`);
};
</script>

<template>
  <article class="video-card" @click="goToWatch">
    <!-- Thumbnail -->
    <div class="thumbnail"></div>

    <!-- Info -->
    <div class="info">
      <h3 class="title">{{ title }}</h3>
      <p class="channel">{{ channel }}</p>
    </div>
  </article>
</template>

<style scoped>
.video-card {
  background: rgba(15, 23, 42, 0.75);
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid rgba(148, 163, 184, 0.12);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

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
  position: relative;
}

/* Optional shimmer */
.thumbnail::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 25%,
    rgba(96, 165, 250, 0.1) 25%,
    rgba(96, 165, 250, 0.1) 50%,
    transparent 50%,
    transparent 75%,
    rgba(96, 165, 250, 0.1) 75%
  );
  background-size: 40px 40px;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  from {
    background-position: -100px 0;
  }
  to {
    background-position: 100px 0;
  }
}

/* Info */
.info {
  padding: 12px 14px 14px;
}

.title {
  font-size: 15px;
  margin: 0 0 4px;
  font-weight: 600;
  line-height: 1.4;
  color: #f1f5f9;
}

.channel {
  font-size: 13px;
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
