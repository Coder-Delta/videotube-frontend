<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";

const isLoading = ref(true);

/* Fake API loading (simulate backend call) */
onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
});
</script>

<template>
    <!-- Loader -->
    <Loader v-if="isLoading" />

    <!-- Page Layout -->
    <div v-else class="page">
        <!-- Top Navbar -->
        <Navbar />

        <div class="layout">
            <!-- Sidebar -->
            <Sidebar />

            <!-- Main Content -->
            <main class="content">
                <h1>Recommended Videos</h1>

                <section class="video-grid">
                    <div v-for="n in 8" :key="n" class="video-card">
                        <div class="thumbnail"></div>
                        <h3>Sample Video {{ n }}</h3>
                        <p>Channel Name</p>
                    </div>
                </section>
            </main>
        </div>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<style scoped>
/* Page wrapper */
.page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #020617;
    color: #e5e7eb;
}

/* Layout with sidebar */
.layout {
    display: flex;
    flex: 1;
}

/* Main content */
.content {
    flex: 1;
    padding: 20px;
}

.content h1 {
    margin-bottom: 16px;
    font-size: 22px;
}

/* Video grid */
.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
}

/* Video card */
.video-card {
    background: #0f172a;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: transform 0.2s;
}

.video-card:hover {
    transform: translateY(-4px);
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
