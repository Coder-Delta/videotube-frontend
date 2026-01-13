<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import BaseLayout from "@/components/layout/BaseLayout.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";
import { showToast } from "@/utils/toast";

const isLoading = ref(true);
const videos = ref([]);
const error = ref(null);
const currentUser = ref(null);

import { getAuthData } from "@/utils/cookie";

const fetchMyVideos = async () => {
    error.value = null;
    try {
        const { token, user } = getAuthData();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // First get current user
        if (!user) {
            error.value = "Please log in to view your channel.";
            isLoading.value = false;
            return;
        }
        currentUser.value = user;

        const response = await axios.get('/api/v1/videos', { headers });

        let allVideos = [];
        const data = response.data;
        if (Array.isArray(data)) {
            allVideos = data;
        } else if (data && Array.isArray(data.data)) {
            allVideos = data.data;
        } else if (data && data.data && Array.isArray(data.data.videos)) {
            allVideos = data.data.videos;
        } else if (data && data.data && Array.isArray(data.data.docs)) {
            allVideos = data.data.docs;
        } else if (data && Array.isArray(data.docs)) {
            allVideos = data.docs;
        }

        // Filter by current user ID
        const myVideos = allVideos.filter(v => {
            const ownerId = v.owner?._id || v.owner;
            return ownerId === currentUser.value._id;
        });

        videos.value = myVideos.map(video => ({
            id: video._id,
            title: video.title,
            thumbnail: video.thumbnail,
            channel: video.owner?.username || currentUser.value.username,
            time: new Date(video.createdAt).toLocaleDateString(),
            duration: video.duration ? (video.duration / 60).toFixed(2) : "00:00",
            isPublished: video.isPublished
        }));

    } catch (err) {
        console.error("Failed to fetch my videos:", err);
        error.value = "Failed to load videos.";
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchMyVideos();
});

const deleteVideo = async (id) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
        const { token } = getAuthData();
        await axios.delete(`/api/v1/videos/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // Remove from list
        videos.value = videos.value.filter(v => v.id !== id);
    } catch (e) {
        showToast('Failed to delete video', 'error');
    }
}

const togglePublish = async (video) => {
    try {
        const { token } = getAuthData();
        await axios.patch(`/api/v1/videos/toggle/publish/${video.id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        video.isPublished = !video.isPublished;
    } catch (e) {
        showToast('Failed to toggle privacy', 'error');
    }
}
</script>

<template>
    <Loader v-if="isLoading" />
    <BaseLayout v-else>
        <div class="channel-header">
            <hgroup>
                <h1>My Channel</h1>
                <p>Manage your uploaded videos</p>
            </hgroup>
            <router-link to="/upload" role="button" class="outline">Upload New</router-link>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-else-if="videos.length === 0" class="empty-state">
            <p>You haven't uploaded any videos yet.</p>
            <router-link to="/upload">Upload your first video</router-link>
        </div>

        <div v-else class="grid">
            <article v-for="video in videos" :key="video.id" class="manage-card">
                <div class="card-preview">
                    <VideoCard :id="video.id" :title="video.title" :thumbnail="video.thumbnail" :channel="video.channel"
                        :time="video.time" :duration="video.duration" />
                </div>
                <footer class="card-actions">
                    <div class="status-badge" :class="{ private: !video.isPublished }">
                        {{ video.isPublished ? 'Public' : 'Private' }}
                    </div>
                    <div class="btn-group">
                        <button class="outline secondary sm" @click="togglePublish(video)">
                            {{ video.isPublished ? 'Make Private' : 'Publish' }}
                        </button>
                        <router-link :to="`/watch/${video.id}`" role="button" class="outline sm">View/Edit</router-link>
                        <button class="outline contrast sm" @click="deleteVideo(video.id)">Delete</button>
                    </div>
                </footer>
            </article>
        </div>
    </BaseLayout>
</template>

<style scoped>
.channel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.manage-card {
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.card-preview {
    flex: 1;
}

.card-actions {
    background: var(--pico-secondary-background);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.status-badge {
    font-size: 0.75rem;
    font-weight: bold;
    color: var(--pico-ins-color);
    background: rgba(var(--pico-ins-color-rgb), 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
}

.status-badge.private {
    color: var(--pico-muted-color);
    background: rgba(128, 128, 128, 0.1);
}

.btn-group {
    display: flex;
    gap: 0.5rem;
}

.sm {
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    margin-bottom: 0;
    width: auto;
}

.empty-state {
    text-align: center;
    padding: 4rem;
    background: var(--pico-card-background-color);
    border-radius: 8px;
}
</style>
