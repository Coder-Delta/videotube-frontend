<script setup>
import { useRouter } from "vue-router";

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
    <div class="suggestion-card" @click="goToWatch">
        <div class="thumbnail">
            <!-- Placeholder for real image -->
            <span class="duration">{{ duration }}</span>
        </div>
        <div class="info">
            <h6 class="title">{{ title }}</h6>
            <p class="meta">{{ channel }}</p>
            <p class="meta small">{{ views }} • {{ time }}</p>
        </div>
    </div>
</template>

<style scoped>
.suggestion-card {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s, background-color 0.2s;
    border-radius: 8px;
    padding: 0.5rem;
}

.suggestion-card:hover {
    background-color: var(--pico-card-background-color);
    transform: translateX(4px);
}

.thumbnail {
    width: 168px;
    /* Standard YouTube sidebar width approx */
    height: 94px;
    background: linear-gradient(135deg, var(--pico-secondary-background) 0%, var(--pico-muted-border-color) 100%);
    border-radius: 8px;
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
}

.duration {
    position: absolute;
    bottom: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 0.7rem;
    padding: 2px 4px;
    border-radius: 4px;
    font-weight: 600;
}

.info {
    flex: 1;
    min-width: 0;
    /* Text truncation fix */
    display: flex;
    flex-direction: column;
    padding-top: 0.25rem;
}

.title {
    margin: 0 0 0.25rem 0;
    font-size: 0.9rem;
    line-height: 1.25;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.meta {
    margin: 0;
    font-size: 0.8rem;
    color: var(--pico-muted-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.meta.small {
    font-size: 0.75rem;
}
</style>
