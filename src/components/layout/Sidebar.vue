<script setup>
import { ref } from 'vue';
import {
    Home, Flame, PlaySquare, Library,
    Settings, ChevronLeft, Menu, User
} from 'lucide-vue-next';

// 1. Initialize state from localStorage
const isOpen = ref(localStorage.getItem('sidebar-expanded') !== 'false');

const menuItems = [
    { icon: Home, label: 'Home', color: '#60a5fa' },
    { icon: Flame, label: 'Trending', color: '#fb7185' },
    { icon: PlaySquare, label: 'Subscriptions', color: '#c084fc' },
    { icon: Library, label: 'Library', color: '#4ade80' },
    { icon: Settings, label: 'Settings', color: '#94a3b8' },
];

// 2. Fixed Toggle Function
const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
    localStorage.setItem('sidebar-expanded', isOpen.value.toString());
};
</script>

<template>
    <aside :class="{ collapsed: !isOpen }">
        <nav>
            <ul>
                <li v-for="(item, index) in menuItems" :key="index">
                    <a href="#" :aria-label="item.label" :data-tooltip="!isOpen ? item.label : null"
                        :class="{ active: index === 0 }">
                        <component :is="item.icon" :size="24" class="menu-icon" />
                        <span v-if="isOpen">{{ item.label }}</span>
                    </a>
                </li>
            </ul>
        </nav>

        <footer>
            <div v-if="isOpen" class="profile-compact">
                <User :size="20" />
                <small>Alex</small>
            </div>
            <button class="outline contrast borderless-toggle" @click="toggleSidebar"
                :aria-label="isOpen ? 'Collapse' : 'Expand'">
                <component :is="isOpen ? ChevronLeft : Menu" :size="20" />
            </button>
        </footer>
    </aside>
</template>

<style scoped>
aside {
    height: 100%;
    width: 240px;
    background-color: var(--pico-card-background-color);
    border-right: 1px solid var(--pico-muted-border-color);
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

aside.collapsed {
    width: 65px;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

nav li {
    margin-bottom: 0.25rem;
}

nav a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: var(--pico-border-radius);
    text-decoration: none;
    color: var(--pico-muted-color);
    transition: all 0.2s;
    white-space: nowrap;
}

nav a:hover,
nav a.active {
    background-color: var(--pico-secondary-background);
    color: var(--pico-primary);
}

nav a.active {
    font-weight: 600;
}

aside.collapsed nav a {
    justify-content: center;
    padding: 0.75rem 0;
}

footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
}

aside.collapsed footer {
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
}

.profile-compact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--pico-muted-color);
}

.borderless-toggle {
    border: none;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
}
</style>