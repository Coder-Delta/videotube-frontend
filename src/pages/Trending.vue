<script setup>
import { ref, onMounted } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import VideoCard from '@/components/video/VideoCard.vue';
import Loader from '@/components/layout/Loader.vue';

const isLoading = ref(true);
const videos = ref(Array.from({ length: 8 }, (_, i) => ({
    id: i + 200,
    title: `Trending Video #${i + 1}`,
    channel: 'Popular Creator',
    views: '1.5M views',
    time: '12 hours ago',
    duration: '15:30'
})));

onMounted(() => {
    setTimeout(() => isLoading.value = false, 800);
});
</script>

<template>
    <Loader v-if="isLoading" />
    <BaseLayout v-else>
        <h2>Trending Now</h2>
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
</style>
