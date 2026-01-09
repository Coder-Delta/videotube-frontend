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
      <span class="duration-badge">{{ duration }}</span>
    </div>

    <div class="content">
      <hgroup>
        <h6>{{ title }}</h6>
        <p>
          {{ channel }}
          <CheckCircle2 :size="12" style="display:inline;" />
          <br />
          <small>{{ views }} • {{ time }}</small>
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
  transition: opacity 0.2s;
}

article.video-card:hover {
  opacity: 0.8;
}

.thumbnail-wrapper {
  background-color: var(--pico-muted-border-color);
  aspect-ratio: 16 / 9;
  position: relative;
}

.duration-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.content {
  padding: var(--pico-spacing);
}

hgroup {
  margin-bottom: 0;
}

hgroup h6 {
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

hgroup p {
  font-size: 0.875rem;
  color: var(--pico-muted-color);
  margin-bottom: 0;
}
</style>