<script setup>
import { useRouter } from "vue-router";
import { CheckCircle2 } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
  id: { type: [String, Number], required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, default: "" },
  channel: { type: String, required: true },
  time: { type: String, default: "Just now" },
  duration: { type: [String, Number], default: 0 }
});

const router = useRouter();
const goToWatch = () => router.push(`/watch/${props.id}`);

// Perfect duration formatter
const formattedDuration = computed(() => {
  const total = Math.floor(Number(props.duration));
  if (!total || total <= 0) return "00:00";

  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return h > 0
    ? `${h}:${pad(m)}:${pad(s)}`
    : `${pad(m)}:${pad(s)}`;
});
</script>

<template>
  <article class="video-card" @click="goToWatch">
    <div class="thumbnail-wrapper">
      <img v-if="thumbnail" :src="thumbnail" :alt="title" class="thumbnail-image" />
      <div v-else class="thumbnail-placeholder"></div>
      <span class="duration-badge">{{ duration }}</span>
    </div>

    <div class="content">
      <hgroup>
        <h6>{{ title }}</h6>
        <p>
          {{ channel }}
          <CheckCircle2 :size="12" style="display:inline;" />
          <br />
          <small>{{ time }}</small>
        </p>
      </hgroup>
    </div>
  </article>
</template>

<style scoped>
article.video-card {
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
  /* Smooth corners */
}

article.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  /* Nice lift effect */
  opacity: 1;
  /* Reset opacity from previous generic style */
}

.thumbnail-wrapper {
  background: linear-gradient(135deg, var(--pico-secondary-background) 0%, var(--pico-muted-border-color) 100%);
  aspect-ratio: 16 / 9;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

article.video-card:hover .thumbnail-image {
  transform: scale(1.05);
}

/* Optional: Add a play icon overlay on hover if desired, or just keep it clean */
.thumbnail-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.2s;
}

article.video-card:hover .thumbnail-wrapper::after {
  opacity: 1;
}

.duration-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  color: #fff;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  z-index: 2;
}

.content {
  padding: 0.75rem;
}

hgroup {
  margin-bottom: 0;
}

hgroup h6 {
  margin-bottom: 0.35rem;
  line-height: 1.4;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

hgroup p {
  font-size: 0.85rem;
  color: var(--pico-muted-color);
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
</style>