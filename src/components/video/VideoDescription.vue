<script setup>
import { ref } from "vue";
import { ChevronDown, ChevronUp, Hash, Share2 } from "lucide-vue-next";

const props = defineProps({
  title: { type: String, required: true },
  // views removed
  date: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, default: () => ['#streaming', '#video', '#tech'] },
  channel: {
    type: Object,
    default: () => ({ name: 'Channel Name', avatar: '', subscribers: '0' })
  },
  isOwner: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  isSubscribed: { type: Boolean, default: false },
  likesCount: { type: Number, default: 0 },
  isLiked: { type: Boolean, default: false }
});

const emit = defineEmits(['toggle-publish', 'delete', 'edit', 'save-playlist', 'subscribe', 'like']);

const expanded = ref(false);
const toggle = () => { expanded.value = !expanded.value; };

const shareVideo = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy link", err);
  }
};
</script>

<template>
  <div class="video-meta-container">
    <!-- Title & Stats -->
    <header class="video-header">
      <h3>{{ title }}</h3>
    </header>

    <!-- Channel Info Bar -->
    <div class="channel-bar">
      <div class="channel-info-left">

        <div v-if="isOwner" class="owner-actions">
          <button class="outline secondary btn-sm" @click="$emit('edit')">Edit</button>
          <button class="outline btn-sm" @click="$emit('toggle-publish')">
            {{ isPublished ? 'Public' : 'Private' }}
          </button>
          <button class="outline contrast btn-sm" @click="$emit('delete')">Delete</button>
        </div>
        <button v-else class="subscribe-btn-sm" :class="{ 'outline': isSubscribed }" @click="$emit('subscribe')">
          {{ isSubscribed ? 'Subscribed' : 'Subscribe' }}
        </button>
      </div>

      <div class="channel-actions-right">
        <!-- Placeholder for Like, Share, etc. similar to YouTube -->
        <button class="action-btn-pill" :class="{ 'active-like': isLiked }" @click="$emit('like')">
          <span class="icon-placeholder">👍</span> {{ isLiked ? 'Liked' : 'Like' }}
        </button>
        <button class="action-btn-pill" @click="$emit('save-playlist')">
          <span class="icon-placeholder">💾</span> Save
        </button>
        <button class="action-btn-pill" @click="shareVideo">
          <Share2 size="18" style="margin-right: 6px;" /> Share
        </button>
      </div>
    </div>

    <!-- Description Box -->
    <article class="description-box">
      <div class="desc-meta">
        <span>{{ date }}</span>
        <div class="tags">
          <span v-for="tag in tags" :key="tag"> {{ tag }}</span>
        </div>
      </div>

      <div class="desc-content" :class="{ collapsed: !expanded }">
        <p>{{ description }}</p>
      </div>
      <button class="show-more-btn" @click="toggle">{{ expanded ? 'Show less' : 'Show more' }}</button>
    </article>
  </div>
</template>

<style scoped>
.video-meta-container {
  margin-top: 1rem;
}

.video-header h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.channel-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0 1rem;
  padding-bottom: 0;
  border-bottom: none;
  flex-wrap: wrap;
  gap: 1rem;
}

.channel-info-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}


.channel-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  margin-right: 1.5rem;
}

.channel-name {
  font-weight: 700;
  color: var(--pico-color);
  text-decoration: none;
  font-size: 1rem;
}

.sub-count {
  font-size: 0.75rem;
  color: var(--pico-muted-color);
}

.subscribe-btn-sm {
  background: var(--pico-color);
  /* Usually black/white depending on theme */
  color: var(--pico-background-color);
  /* Inverse */
  border: none;
  border-radius: 99px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  width: auto;
  transition: opacity 0.2s;
}

.subscribe-btn-sm:hover {
  opacity: 0.9;
}

.channel-actions-right {
  display: flex;
  gap: 0.5rem;
}

.action-btn-pill {
  background: var(--pico-secondary-background);
  color: var(--pico-color);
  border: none;
  border-radius: 99px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: auto;
}

.action-btn-pill:hover {
  background: var(--pico-muted-border-color);
}

.description-box {
  background: var(--pico-card-background-color);
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  box-shadow: none;
  border: none;
  /* Override Pico article */
  margin-bottom: 1.5rem;
}

.description-box:hover {
  background: var(--pico-secondary-background);
}

.desc-meta {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.tags {
  display: inline-flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
  color: var(--pico-primary);
}

.desc-content {
  overflow: hidden;
  white-space: pre-wrap;
  color: var(--pico-color);
}

.desc-content.collapsed {
  max-height: 60px;
  /* text-overflow: ellipsis; */
  position: relative;
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}

.show-more-btn {
  background: none;
  border: none;
  padding: 0;
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--pico-color);
  cursor: pointer;
  font-size: 0.9rem;
}

.owner-actions {
  display: flex;
  gap: 0.5rem;
}



.active-like {
  background: var(--pico-primary-background);
  /* Or any color you prefer */
  color: var(--pico-primary-inverse);
  border-color: var(--pico-primary);
}
</style>