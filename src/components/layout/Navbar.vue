<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { User, LogOut, Settings, UserCircle, PlaySquare, Upload, Search, Menu } from 'lucide-vue-next';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Trending', path: '/trending' },
  { label: 'Subscriptions', path: '/subscriptions' },
  { label: 'Playlist', path: '/playlist' }
];

const currentUser = ref(null);
const dropdownOpen = ref(false);
const showMobileSearch = ref(false);

const checkAuth = () => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  } else {
    currentUser.value = null;
  }
};

const toggleDropdown = (e) => {
  if (e.target.closest('a')) return;
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value;
};

const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.profile-dropdown-container');
  if (dropdown && !dropdown.contains(event.target)) {
    closeDropdown();
  }
  // Close mobile search if open and clicked outside
  const searchContainer = document.querySelector('.search-container.mobile-visible');
  const searchToggleButton = document.querySelector('.mobile-only .icon-btn');
  if (showMobileSearch.value && searchContainer && !searchContainer.contains(event.target) && (!searchToggleButton || !searchToggleButton.contains(event.target))) {
    showMobileSearch.value = false;
  }
};

onMounted(() => {
  checkAuth();
  window.addEventListener('storage', checkAuth);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('storage', checkAuth);
  document.removeEventListener('click', handleClickOutside);
});

const logout = () => {
  localStorage.removeItem('user');
  currentUser.value = null;
  window.location.reload();
};
</script>

<template>
  <nav class="container-fluid navbar">
    <!-- Left: Brand + Nav -->
    <ul class="nav-left">
      <li>
        <strong class="brand-logo">
          <span class="desktop-brand">Cholochitro.exe</span>
          <span class="mobile-brand">CC.exe</span>
        </strong>
      </li>
      <li v-for="(link, i) in navLinks" :key="i" class="hidden-mobile">
        <router-link :to="link.path" class="secondary link-item">{{ link.label }}</router-link>
      </li>
    </ul>

    <!-- Center: Search -->
    <ul class="nav-center">
      <li class="search-container" :class="{ 'mobile-visible': showMobileSearch }">
        <div class="search-wrapper">
          <Search size="18" class="search-icon-input" />
          <input type="search" placeholder="Search" aria-label="Search" class="search-input" />
        </div>
      </li>
    </ul>

    <!-- Right: Actions -->
    <ul class="nav-actions">
      <!-- Mobile Search Toggle -->
      <li class="mobile-only">
        <button class="icon-btn" @click="toggleMobileSearch">
          <Search size="20" />
        </button>
      </li>

      <li>
        <router-link to="/upload" class="secondary icon-link" aria-label="Upload">
          <Upload size="20" />
          <span class="link-text">Upload</span>
        </router-link>
      </li>

      <li v-if="currentUser" class="profile-dropdown-container">
        <!-- Trigger -->
        <button class="avatar-btn" @click.stop="toggleDropdown" :aria-expanded="dropdownOpen">
          <div class="avatar">
            <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Avatar" />
            <User v-else size="20" />
          </div>
        </button>

        <!-- Dropdown Menu -->
        <div class="dropdown-menu" :class="{ 'show': dropdownOpen }">
          <div class="dropdown-header">
            <div class="header-avatar">
              <User size="24" />
            </div>
            <div class="header-info">
              <strong>{{ currentUser.name || 'User' }}</strong>
              <small>{{ currentUser.email }}</small>
            </div>
          </div>

          <div class="dropdown-divider"></div>

          <nav class="dropdown-nav">
            <router-link to="/profile" class="dropdown-item" @click="closeDropdown">
              <UserCircle size="18" /> Profile
            </router-link>
            <a href="#" class="dropdown-item" @click="closeDropdown">
              <Settings size="18" /> Settings
            </a>
          </nav>

          <div class="dropdown-divider"></div>

          <nav class="dropdown-nav">
            <a href="#" @click.prevent="logout" class="dropdown-item logout">
              <LogOut size="18" /> Sign Out
            </a>
          </nav>
        </div>
      </li>
      <li v-else>
        <router-link to="/login" role="button" class="sm-btn">Sign In</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  height: 64px;
  border-bottom: 1px solid var(--pico-muted-border-color);
  padding: 0 1rem;
  z-index: 1000;
  position: sticky;
  top: 0;
  background: rgba(var(--pico-background-color-rgb), 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left,
.nav-center,
.nav-actions {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-left {
  gap: 1.5rem;
}

.nav-actions {
  gap: 0.75rem;
  justify-content: flex-end;
}

.brand-logo {
  font-size: 1.25rem;
  letter-spacing: -0.5px;
  color: var(--pico-color);
}

.mobile-brand {
  display: none;
}

.link-item {
  font-size: 0.9rem;
  color: var(--pico-muted-color);
  text-decoration: none;
  transition: color 0.2s;
}

.link-item:hover {
  color: var(--pico-primary);
}

/* Search Styles */
.nav-center {
  flex: 1;
  justify-content: center;
  max-width: 600px;
}

.search-container {
  width: 100%;
  max-width: 400px;
  list-style: none;
}

.search-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.search-icon-input {
  position: absolute;
  left: 12px;
  color: var(--pico-muted-color);
  pointer-events: none;
}

.search-input {
  margin-bottom: 0;
  height: 2.25rem;
  padding-left: 2.5rem;
  border-radius: 99px;
  /* Pill shape */
  background-color: var(--pico-secondary-background);
  border: 1px solid transparent;
  transition: all 0.2s;
  font-size: 0.9rem;
  -webkit-appearance: none;
  /* Remove default styling */
  appearance: none;
  background-image: none !important;
  /* Remove Pico CSS default icon */
  background-position: unset !important;
}

/* Hide native search icons to prevent duplication */
.search-input::-webkit-search-decoration,
.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-results-button,
.search-input::-webkit-search-results-decoration {
  display: none;
}

.search-input:focus {
  background-color: var(--pico-background-color);
  border-color: var(--pico-primary);
  box-shadow: 0 0 0 2px rgba(var(--pico-primary-rgb), 0.2);
}

/* Actions Styles */
.nav-actions li {
  list-style: none;
}

.icon-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--pico-color);
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.icon-link:hover {
  background: var(--pico-secondary-background);
}

.icon-btn {
  background: transparent;
  border: none;
  padding: 0.5rem;
  color: var(--pico-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-only {
  display: none;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .hidden-mobile {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-left {
    gap: 1rem;
  }

  .nav-center {
    justify-content: flex-end;
    margin-right: 0.5rem;
  }
}

@media (max-width: 600px) {
  .desktop-brand {
    display: none;
  }

  .mobile-brand {
    display: block;
  }

  .link-text {
    display: none;
  }

  /* Hide 'Upload' text */

  /* Search Logic for Mobile */
  .mobile-only {
    display: block;
  }

  /* Show search toggle */

  .search-container {
    display: none;
    /* Hidden by default on mobile */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background: var(--pico-background-color);
    padding: 0 1rem;
    z-index: 1010;
    align-items: center;
    max-width: none;
  }

  .search-container.mobile-visible {
    display: flex;
  }
}

/* Avatar Trigger & Dropdown (Existing styles refined) */
.profile-dropdown-container {
  position: relative;
}

.avatar-btn {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--pico-secondary-background);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-btn:hover .avatar {
  border-color: var(--pico-primary);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 260px;
  background: var(--pico-card-background-color);
  border: 1px solid var(--pico-muted-border-color);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2000;
  overflow: hidden;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--pico-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-info strong {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-info small {
  font-size: 0.75rem;
  color: var(--pico-muted-color);
}

.dropdown-divider {
  height: 1px;
  background: var(--pico-muted-border-color);
  width: 100%;
}

.dropdown-nav {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  color: var(--pico-color);
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.1s;
}

.dropdown-item:hover {
  background: var(--pico-secondary-background);
  color: var(--pico-primary);
}

.dropdown-item svg {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}

.logout:hover {
  background: rgba(220, 53, 69, 0.1);
  color: var(--pico-del-color);
}

@media (max-width: 576px) {
  .dropdown-menu {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    top: auto;
    right: auto;
    transform: translateY(100%);
    border-radius: 16px 16px 0 0;
    border-bottom: none;
  }

  .dropdown-menu.show {
    transform: translateY(0);
  }
}
</style>