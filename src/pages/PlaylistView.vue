<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import Loader from '@/components/layout/Loader.vue';
import VideoCard from '@/components/video/VideoCard.vue';
import { Trash2 } from 'lucide-vue-next';

const route = useRoute();
const isLoading = ref(true);
const playlist = ref(null);
const videos = ref([]);
const isOwner = ref(false);

import { getAuthData } from "@/utils/cookie";

const fetchPlaylist = async () => {
    try {
        const id = route.params.id;
        const { token, user } = getAuthData();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`/api/v1/playlist/${id}`, { headers });
        console.log("Playlist Response:", res.data); // Debugging
        playlist.value = res.data.data;

        // Handle 'video' (DB schema) vs 'videos' (potential API transformation)
        let rawVideos = playlist.value.videos || playlist.value.video || [];

        // Map raw items to a standard format, or flag for fetching
        const processedVideos = await Promise.all(rawVideos.map(async (item) => {
            // Case 1: Populated nested object
            if (item.video && item.video._id) return item.video;

            // Case 2: Already populated video object
            if (item._id && item.title) return item;

            // Case 3: ID string or partial object - needs fetching
            let videoId = typeof item === 'string' ? item : item._id;

            // Case 4: Handle MongoDB Extended JSON format (e.g. { $oid: "..." }) or wrappers
            if (!videoId && item.$oid) videoId = item.$oid;
            if (!videoId && item.toString) videoId = item.toString(); // Fallback

            if (videoId) {
                try {
                    // videoId could be an object if strict mode, ensure string
                    if (typeof videoId === 'object') videoId = videoId.toString();

                    const vidRes = await axios.get(`/api/v1/videos/${videoId}`, { headers });
                    return vidRes.data.data;
                } catch (err) {
                    console.error(`Failed to fetch video ${videoId}`, err);
                    return null;
                }
            }
            return null;
        }));

        // Filter out nulls
        videos.value = processedVideos.filter(v => v !== null);

        // Check owner
        if (user && playlist.value.owner === user._id) {
            isOwner.value = true;
        }

    } catch (e) {
        console.error("Failed to load playlist", e);
    } finally {
        isLoading.value = false;
    }
};

const removeVideo = async (videoId) => {
    if (!confirm("Remove video from playlist?")) return;
    try {
        const { token } = getAuthData();
        await axios.patch(`/api/v1/playlist/remove/${videoId}/${playlist.value._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        videos.value = videos.value.filter(v => v._id !== videoId);
    } catch (e) {
        alert("Failed to remove video");
    }
};

onMounted(fetchPlaylist);
</script>

<template>
    <Loader v-if="isLoading" />
    <BaseLayout v-else>
        <div v-if="playlist" class="playlist-container">
            <header class="playlist-header">
                <div>
                    <h1>{{ playlist.name }}</h1>
                    <p>{{ playlist.description }}</p>
                    <small>{{ videos.length }} videos</small>
                </div>
            </header>

            <div v-if="videos.length === 0" class="empty">
                This playlist has no videos.
            </div>

            <div class="video-list">
                <article v-for="video in videos" :key="video._id" class="playlist-item">
                    <div class="video-preview">
                        <VideoCard :id="video._id" :title="video.title" :thumbnail="video.thumbnail"
                            :channel="video.owner?.username || 'Unknown'"
                            :views="video.views ? `${video.views} views` : '0 views'"
                            :time="new Date(video.createdAt).toLocaleDateString()"
                            :duration="video.duration ? (video.duration / 60).toFixed(2) : '00:00'" />
                    </div>
                    <div v-if="isOwner" class="actions">
                        <button class="icon-btn-danger" @click="removeVideo(video._id)" title="Remove from playlist">
                            <Trash2 size="20" />
                        </button>
                    </div>
                </article>
            </div>
        </div>
        <div v-else class="error">
            Playlist not found.
        </div>
    </BaseLayout>
</template>

<style scoped>
.playlist-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--pico-muted-border-color);
}

.playlist-header h1 {
    margin-bottom: 0.5rem;
}

.playlist-header p {
    color: var(--pico-muted-color);
    margin-bottom: 0.5rem;
}

.video-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.playlist-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.video-preview {
    flex: 1;
    max-width: 300px;
}

.actions {
    display: flex;
    align-items: center;
    padding-top: 2rem;
}

.icon-btn-danger {
    background: transparent;
    border: none;
    color: var(--pico-del-color);
    cursor: pointer;
    opacity: 0.7;
}

.icon-btn-danger:hover {
    opacity: 1;
}

@media (max-width: 768px) {
    .video-preview {
        max-width: 100%;
    }

    .playlist-item {
        flex-direction: column;
    }

    .actions {
        padding-top: 0;
    }
}
</style>
