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
  <article class="video-description">
    <header>
      <h3>{{ title }}</h3>
      <div class="meta">
        <small>{{ views }} • {{ date }}</small>
        <div class="tags">
          <span v-for="tag in tags" :key="tag"><a href="#" class="secondary">{{ tag }}</a></span>
        </div>
      </div>
    </header>

    <details>
      <summary>Description</summary>
      <p>{{ description }}</p>
    </details>
  </article>
</template>

<style scoped>
.video-description {
  margin-top: 1rem;
  box-shadow: none;
  border: 1px solid var(--pico-muted-border-color);
  background: transparent;
}

header {
  margin-bottom: 0.5rem;
  padding-bottom: 0;
  border-bottom: none;
}

h3 {
  margin-bottom: 0.25rem;
  font-size: 1.25rem;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
}

details {
  margin-bottom: 0;
  border-bottom: none;
}

summary {
  font-size: 0.875rem;
  font-weight: 600;
}
</style>