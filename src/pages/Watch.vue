<script setup>
import { ref, onMounted } from "vue";

import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";

const isLoading = ref(true);

// Fake video data (replace with API)
const video = ref({
    title: "Building Videotube with Vue 3",
    views: "24,132 views",
    date: "2 days ago",
    description:
        "In this video, we build a YouTube-like platform using Vue 3 and pure CSS.",
    channel: {
        name: "Videotube Channel",
        subscribers: "12.4K subscribers",
    },
});

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
});
</script>

<template>
    <!-- Loader -->
    <Loader v-if="isLoading" />

    <div v-else class="page">
        <!-- Navbar -->
        <Navbar />

        <div class="layout">
            <!-- Sidebar -->
            <Sidebar />

            <!-- Main Content -->
            <main class="content">
                <div class="watch-layout">
                    <!-- Video Section -->
                    <section class="video-section">
                        <!-- Video Player -->
                        <div class="video-player">
                            <!-- Replace with <video> tag later -->
                            <div class="video-placeholder">
                                Video Player
                            </div>
                        </div>

                        <!-- Video Info -->
                        <h2 class="video-title">{{ video.title }}</h2>

                        <div class="video-meta">
                            <span>{{ video.views }}</span>
                            <span>•</span>
                            <span>{{ video.date }}</span>
                        </div>

                        <!-- Channel Info -->
                        <div class="channel-row">
                            <div class="channel-left">
                                <div class="avatar"></div>
                                <div>
                                    <h4>{{ video.channel.name }}</h4>
                                    <p>{{ video.channel.subscribers }}</p>
                                </div>
                            </div>

                            <button class="subscribe-btn">Subscribe</button>
                        </div>

                        <!-- Description -->
                        <div class="description">
                            {{ video.description }}
                        </div>
                    </section>

                    <!-- Suggested Videos -->
                    <aside class="suggestions">
                        <h3>Up next</h3>

                        <div v-for="n in 6" :key="n" class="suggest-card">
                            <div class="thumb"></div>
                            <div class="info">
                                <h4>Suggested Video {{ n }}</h4>
                                <p>Channel Name</p>
                                <span>12K views</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<style scoped>
/* Page */
.page {
    min-height: 100vh;
    background: #020617;
    color: #e5e7eb;
    display: flex;
    flex-direction: column;
}

/* Layout */
.layout {
    display: flex;
    flex: 1;
}

/* Content */
.content {
    flex: 1;
    padding: 20px;
}

/* Watch layout */
.watch-layout {
    display: flex;
    gap: 20px;
}

/* Video section */
.video-section {
    flex: 3;
}

/* Player */
.video-player {
    width: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
}

.video-placeholder {
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    color: #9ca3af;
    font-size: 18px;
}

/* Title */
.video-title {
    margin-top: 14px;
    font-size: 20px;
}

/* Meta */
.video-meta {
    margin-top: 6px;
    font-size: 13px;
    color: #9ca3af;
    display: flex;
    gap: 6px;
}

/* Channel row */
.channel-row {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.channel-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #1e293b;
}

.channel-left h4 {
    margin: 0;
    font-size: 14px;
}

.channel-left p {
    margin: 0;
    font-size: 12px;
    color: #9ca3af;
}

.subscribe-btn {
    padding: 8px 16px;
    background: #dc2626;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.subscribe-btn:hover {
    background: #b91c1c;
}

/* Description */
.description {
    margin-top: 14px;
    padding: 12px;
    background: #0f172a;
    border-radius: 6px;
    font-size: 14px;
    color: #cbd5f5;
}

/* Suggestions */
.suggestions {
    flex: 1.4;
}

.suggestions h3 {
    margin-bottom: 12px;
}

.suggest-card {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
    cursor: pointer;
}

.thumb {
    width: 160px;
    height: 90px;
    background: #1e293b;
    border-radius: 6px;
}

.info h4 {
    margin: 0;
    font-size: 13px;
}

.info p {
    margin: 4px 0;
    font-size: 12px;
    color: #9ca3af;
}

.info span {
    font-size: 12px;
    color: #9ca3af;
}

/* Responsive */
@media (max-width: 900px) {
    .watch-layout {
        flex-direction: column;
    }

    .suggestions {
        margin-top: 20px;
    }
}
</style>
