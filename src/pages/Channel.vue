<script setup>
import { ref, onMounted } from "vue";

import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";

const isLoading = ref(true);

// Fake channel data (replace with API later)
const channel = ref({
    name: "Videotube Channel",
    subscribers: "12.4K subscribers",
    description: "This is a demo channel description for Videotube.",
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
                <!-- Channel Header -->
                <section class="channel-header">
                    <div class="avatar"></div>

                    <div class="channel-info">
                        <h2>{{ channel.name }}</h2>
                        <p class="subs">{{ channel.subscribers }}</p>
                        <p class="desc">{{ channel.description }}</p>
                    </div>

                    <button class="subscribe-btn">Subscribe</button>
                </section>

                <!-- Channel Tabs -->
                <nav class="channel-tabs">
                    <button class="active">Videos</button>
                    <button>Playlists</button>
                    <button>About</button>
                </nav>

                <!-- Videos -->
                <section class="video-grid">
                    <div v-for="n in 6" :key="n" class="video-card">
                        <div class="thumbnail"></div>
                        <h3>Channel Video {{ n }}</h3>
                        <p>1.2K views • 2 days ago</p>
                    </div>
                </section>
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

/* Channel Header */
.channel-header {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #1e293b;
}

.channel-info {
    flex: 1;
}

.channel-info h2 {
    margin: 0;
}

.subs {
    font-size: 14px;
    color: #9ca3af;
}

.desc {
    font-size: 14px;
    margin-top: 6px;
    color: #cbd5f5;
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

/* Tabs */
.channel-tabs {
    margin-top: 20px;
    display: flex;
    gap: 12px;
    border-bottom: 1px solid #1e293b;
}

.channel-tabs button {
    background: none;
    border: none;
    padding: 10px;
    color: #cbd5f5;
    cursor: pointer;
    font-size: 14px;
}

.channel-tabs button.active {
    color: #ffffff;
    border-bottom: 2px solid #2563eb;
}

/* Video Grid */
.video-grid {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
}

/* Video Card */
.video-card {
    background: #0f172a;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
}

.thumbnail {
    height: 120px;
    background: #1e293b;
    border-radius: 6px;
    margin-bottom: 8px;
}

.video-card h3 {
    font-size: 14px;
    margin: 0;
}

.video-card p {
    font-size: 12px;
    color: #9ca3af;
}
</style>
