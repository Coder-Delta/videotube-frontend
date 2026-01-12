<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import BaseLayout from "@/components/layout/BaseLayout.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";
import { getAllVideos } from "@/services/video.service";

const route = useRoute();
const isLoading = ref(true);
const videos = ref([]);
const error = ref(null);
const searchQuery = ref(route.query.q || "");

const fetchVideos = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        const query = searchQuery.value;
        const response = await getAllVideos(1, 10, query);

        let videoList = [];
        // Handle different possible API response structures
        if (response && response.data) {
            if (Array.isArray(response.data)) {
                videoList = response.data;
            } else if (Array.isArray(response.data.videos)) {
                videoList = response.data.videos;
            } else if (Array.isArray(response.data.docs)) {
                videoList = response.data.docs;
            }
        } else if (Array.isArray(response)) {
            videoList = response;
        }

        videos.value = videoList.map(video => ({
            id: video._id,
            title: video.title,
            thumbnail: video.thumbnail,
            channel: video.owner?.username || "Cholochitro User",
            time: new Date(video.createdAt).toLocaleDateString(),
            duration: video.duration ? (video.duration / 60).toFixed(2) : "00:00"
        }));
    } catch (err) {
        console.error("Failed to fetch search results:", err);
        error.value = "Failed to load search results. Please try again later.";
    } finally {
        isLoading.value = false;
    }
};

// Watch for route query changes
watch(() => route.query.q, (newQ) => {
    searchQuery.value = newQ || "";
    fetchVideos();
});

onMounted(() => {
    fetchVideos();
});
</script>

<template>
    <BaseLayout>
        <div class="search-header">
            <h3>Search results for: "{{ searchQuery }}"</h3>
        </div>

        <Loader v-if="isLoading" />

        <div v-else>
            <div v-if="error" class="error-message">
                {{ error }}
            </div>

            <div v-else-if="videos.length === 0" class="empty-state">
                <p>No videos found matching your search. Try different keywords.</p>
            </div>

            <div v-else class="grid">
                <div v-for="video in videos" :key="video.id">
                    <VideoCard :id="video.id" :title="video.title" :thumbnail="video.thumbnail" :channel="video.channel"
                        :time="video.time" :duration="video.duration" />
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>
.search-header {
    margin-bottom: 2rem;
}

.error-message {
    color: var(--pico-del-color);
    text-align: center;
    padding: 2rem;
    background: rgba(var(--pico-del-color-rgb), 0.1);
    border-radius: 8px;
    margin-bottom: 2rem;
}

.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--pico-muted-color);
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding-bottom: 2rem;
    animation: fadeIn 0.5s ease-out;
}

@media (max-width: 576px) {
    .grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
