<script setup>
import { ref } from "vue";

const isOpen = ref(true);
</script>

<template>
    <aside :class="['sidebar', { collapsed: !isOpen }]">
        <!-- Header -->
        <div class="sidebar-header">
            <span v-if="isOpen" class="logo">Videotube</span>
            <button class="toggle-btn" @click="isOpen = !isOpen">
                ☰
            </button>
        </div>

        <!-- Menu -->
        <nav class="menu">
            <a href="#" class="menu-item">
                <span class="icon">🏠</span>
                <span v-if="isOpen">Home</span>
            </a>

            <a href="#" class="menu-item">
                <span class="icon">🔥</span>
                <span v-if="isOpen">Trending</span>
            </a>

            <a href="#" class="menu-item">
                <span class="icon">📺</span>
                <span v-if="isOpen">Subscriptions</span>
            </a>

            <a href="#" class="menu-item">
                <span class="icon">📁</span>
                <span v-if="isOpen">Library</span>
            </a>

            <a href="#" class="menu-item">
                <span class="icon">⚙️</span>
                <span v-if="isOpen">Settings</span>
            </a>
        </nav>
    </aside>
</template>

<style scoped>
/* Sidebar layout */
.sidebar {
    width: 240px;
    height: 100vh;
    background: #0f172a;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    transition: width 0.3s ease;
}

/* Collapsed sidebar */
.sidebar.collapsed {
    width: 64px;
}

/* Header */
.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #1e293b;
}

.logo {
    font-size: 18px;
    font-weight: 600;
}

/* Toggle button */
.toggle-btn {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
}

/* Menu */
.menu {
    display: flex;
    flex-direction: column;
    padding-top: 8px;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: #cbd5f5;
    text-decoration: none;
    transition: background 0.2s;
}

.menu-item:hover {
    background: #1e293b;
    color: #ffffff;
}

.icon {
    width: 24px;
    text-align: center;
}
</style>
