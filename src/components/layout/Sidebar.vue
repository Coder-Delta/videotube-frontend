<script setup>
import { ref } from 'vue';
// Using Lucide Icons for a professional, "pretty" look
import {
    Home,
    Flame,
    PlaySquare,
    Library,
    Settings,
    ChevronLeft,
    Menu,
    User
} from 'lucide-vue-next';

const isOpen = ref(true);

const menuItems = [
    { icon: Home, label: 'Home', color: '#60a5fa' },
    { icon: Flame, label: 'Trending', color: '#fb7185' },
    { icon: PlaySquare, label: 'Subscriptions', color: '#c084fc' },
    { icon: Library, label: 'Library', color: '#4ade80' },
    { icon: Settings, label: 'Settings', color: '#94a3b8' },
];
</script>

<template>
    <aside :class="['sidebar', { collapsed: !isOpen }]">
        <div class="glass-overlay"></div>
        <div class="glow-orb"></div>

        <header class="sidebar-header">
            <div class="logo-area" v-if="isOpen">
                <div class="logo-icon">
                    <div class="play-inner"></div>
                </div>
                <div class="logo-text-group">
                    <span class="logo-main">VideoTube</span>
                    <span class="logo-badge">PRO</span>
                </div>
            </div>

            <button class="toggle-control" @click="isOpen = !isOpen" :title="isOpen ? 'Collapse' : 'Expand'">
                <component :is="isOpen ? ChevronLeft : Menu" :size="20" />
            </button>
        </header>

        <nav class="nav-container">
            <a v-for="(item, index) in menuItems" :key="index" href="#" class="nav-link"
                :style="{ '--item-color': item.color }">
                <div class="icon-box">
                    <component :is="item.icon" :size="22" stroke-width="2" />
                </div>
                <span class="nav-label" v-if="isOpen">{{ item.label }}</span>

                <span class="tooltip" v-if="!isOpen">{{ item.label }}</span>
            </a>
        </nav>

        <footer class="sidebar-footer">
            <div class="profile-card">
                <div class="avatar-wrapper">
                    <User :size="20" />
                    <div class="status-indicator"></div>
                </div>
                <div class="profile-info" v-if="isOpen">
                    <span class="user-name">Alex Rivera</span>
                    <span class="user-plan">Premium Member</span>
                </div>
            </div>
        </footer>
    </aside>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

.sidebar {
    --sb-bg: #0b0f1a;
    --sb-accent: #3b82f6;
    --transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);

    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 280px;
    background: var(--sb-bg);
    display: flex;
    flex-direction: column;
    transition: var(--transition);
    z-index: 1000;
    font-family: 'Plus Jakarta Sans', sans-serif;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
}

.sidebar.collapsed {
    width: 88px;
}

/* Glass & Glow Effects */
.glass-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(59, 130, 246, 0.03) 0%, transparent 100%);
    pointer-events: none;
}

.glow-orb {
    position: absolute;
    top: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    filter: blur(40px);
    pointer-events: none;
}

/* Header & Logo */
.sidebar-header {
    padding: 32px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 100px;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: fadeIn 0.3s ease forwards;
}

.logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #ef4444, #b91c1c);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.play-inner {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 10px solid white;
    border-bottom: 6px solid transparent;
    margin-left: 2px;
}

.logo-main {
    font-weight: 800;
    font-size: 1.2rem;
    letter-spacing: -0.5px;
    color: #fff;
}

.logo-badge {
    font-size: 10px;
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
    padding: 2px 6px;
    border-radius: 6px;
    font-weight: 700;
    margin-left: 6px;
}

/* Toggle Button */
.toggle-control {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #94a3b8;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
}

.toggle-control:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: scale(1.05);
}

/* Nav Links */
.nav-container {
    padding: 0 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.nav-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 14px 16px;
    text-decoration: none;
    color: #94a3b8;
    border-radius: 16px;
    transition: var(--transition);
}

.icon-box {
    min-width: 24px;
    display: flex;
    justify-content: center;
    transition: var(--transition);
}

.nav-label {
    margin-left: 16px;
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.04);
    color: var(--item-color);
    transform: translateX(4px);
}

.nav-link:hover .icon-box {
    filter: drop-shadow(0 0 8px var(--item-color));
}

/* Tooltip for Collapsed Mode */
.tooltip {
    position: absolute;
    left: 90px;
    background: #1e293b;
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.nav-link:hover .tooltip {
    opacity: 1;
    left: 80px;
}

/* Footer & Profile */
.sidebar-footer {
    padding: 24px 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.profile-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 20px;
}

.avatar-wrapper {
    width: 44px;
    height: 44px;
    background: #1e293b;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    position: relative;
}

.status-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 12px;
    height: 12px;
    background: #10b981;
    border: 3px solid var(--sb-bg);
    border-radius: 50%;
}

.profile-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.user-name {
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
}

.user-plan {
    color: #64748b;
    font-size: 11px;
}

/* Animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    .sidebar:not(.collapsed) {
        width: 100%;
    }
}
</style>