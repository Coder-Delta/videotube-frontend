<script setup>
import { ref, onMounted } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import VideoCard from '@/components/video/VideoCard.vue';
import Loader from '@/components/layout/Loader.vue';
import { getSubscribedVideos } from '@/services/video.service';

const isLoading = ref(true);
const videos = ref([]);

onMounted(async () => {
    try {
        const response = await getSubscribedVideos();
        videos.value = response.data.data;
    } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        videos.value = Array.from({ length: 6 }, (_, i) => ({
            id: i + 300,
            title: `Subscription Update #${i + 1}`,
            channel: 'My Fav Channel',
            views: '200K views',
            time: '1 hour ago',
            duration: '10:00'
        }));
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <Loader v-if="isLoading" />
    <BaseLayout v-else>
        <h2>Subscriptions</h2>
        <div class="feed-filter">
            <button class="outline" :aria-current="true">All</button>
            <button class="outline">Today</button>
            <button class="outline">Live</button>
        </div>
        <div class="video-grid">
            <VideoCard v-for="video in videos" :key="video.id" v-bind="video" />
        </div>
    </BaseLayout>
</template>

<style scoped>
.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
}

.feed-filter {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.feed-filter button {
    width: auto;
    padding: 0.25rem 1rem;
    font-size: 0.875rem;
}
</style>
