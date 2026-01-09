<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { User, LogOut, Settings, UserCircle, PlaySquare } from 'lucide-vue-next';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Trending', path: '/trending' },
  { label: 'Subscriptions', path: '/subscriptions' },
  { label: 'Playlist', path: '/playlist' }
];

const currentUser = ref(null);
const dropdownOpen = ref(false);

const checkAuth = () => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  } else {
    currentUser.value = null;
  }
};

const toggleDropdown = (e) => {
  if (e.target.closest('a')) return; // Don't toggle if clicking a link inside
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

// Close on click outside
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.profile-dropdown-container');
  if (dropdown && !dropdown.contains(event.target)) {
    closeDropdown();
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
  <nav class="container-fluid">
    <!-- Left: Brand + Nav -->
    <ul>
      <li><strong class="brand-logo">Cholochitro.exe</strong></li>
      <li v-for="(link, i) in navLinks" :key="i" class="hidden-mobile">
        <router-link :to="link.path" class="secondary">{{ link.label }}</router-link>
      </li>
    </ul>

    <!-- Center: Search -->
    <ul>
      <li>
        <input type="search" placeholder="Search" aria-label="Search" class="search-input" />
      </li>
    </ul>

    <!-- Right: Actions -->
    <ul class="nav-actions">
      <li><router-link to="/upload" class="secondary">Upload</router-link></li>

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
        <router-link to="/login" role="button">Sign In</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  border-bottom: 1px solid var(--pico-muted-border-color);
  padding: 0.5rem 1rem;
  z-index: 1000;
  position: relative;
  background: var(--pico-background-color);
}

.brand-logo {
  font-size: 1.5rem;
  letter-spacing: -0.5px;
}

.search-input {
  margin-bottom: 0;
  height: 2.25rem;
  width: 300px;
}

nav ul {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-actions {
  justify-content: flex-end;
}

@media (max-width: 992px) {
  .hidden-mobile {
    display: none;
  }
}

@media (max-width: 768px) {
  .search-input {
    width: 150px;
  }
}

/* Avatar Trigger */
.profile-dropdown-container {
  position: relative;
}

.avatar-btn {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: block;
  width: auto;
}

.avatar-btn:focus {
  box-shadow: none;
}

.avatar {
  width: 40px;
  height: 40px;
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

.avatar-btn:hover .avatar,
.avatar-btn[aria-expanded="true"] .avatar {
  border-color: var(--pico-primary);
  transform: scale(1.05);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 280px;
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
  padding: 0;
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
  gap: 1rem;
}

.header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--pico-primary);
  color: var(--pico-primary-inverse);
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
  font-size: 0.95rem;
  color: var(--pico-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-info small {
  font-size: 0.8rem;
  color: var(--pico-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-divider {
  height: 1px;
  background: var(--pico-muted-border-color);
  margin: 0;
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
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: var(--pico-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.15s;
  background: transparent;
  cursor: pointer;
}

.dropdown-item:hover {
  background: var(--pico-secondary-background);
  color: var(--pico-primary);
  text-decoration: none;
}

.dropdown-item svg {
  opacity: 0.7;
  transition: opacity 0.2s;
}

.dropdown-item:hover svg {
  opacity: 1;
}

.logout {
  color: var(--pico-del-color);
}

.logout:hover {
  background: rgba(255, 0, 0, 0.05);
  color: var(--pico-del-color);
}

/* Mobile Adjustments */
@media (max-width: 576px) {
  .dropdown-menu {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: auto;
    transform: translateY(100%);
    border-radius: 12px 12px 0 0;
    border-bottom: none;
  }

  .dropdown-menu.show {
    transform: translateY(0);
  }
}
</style>