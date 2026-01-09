<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { User } from 'lucide-vue-next';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Trending', path: '/trending' },
  { label: 'Subscriptions', path: '/subscriptions' },
  { label: 'Playlist', path: '/playlist' }
];

const currentUser = ref(null);


const checkAuth = () => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  } else {
    currentUser.value = null;
  }
};

onMounted(() => {
  checkAuth();
  window.addEventListener('storage', checkAuth);
});

onUnmounted(() => {
  window.removeEventListener('storage', checkAuth);
});

const logout = () => {
  localStorage.removeItem('user');
  currentUser.value = null;
  window.location.reload(); // Simple reload to clear state
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
    <ul>
      <li><router-link to="/upload" class="secondary">Upload</router-link></li>

      <li v-if="currentUser">
        <details role="list" dir="rtl">
          <summary aria-haspopup="listbox" role="link" class="profile-link">
            <div class="avatar">
              <User size="20" />
            </div>
          </summary>
          <ul role="listbox">
            <li><small>{{ currentUser.email }}</small></li>
            <li><a href="#">My Channel</a></li>
            <li><a href="#">Settings</a></li>
            <li>
              <hr />
            </li>
            <li><a href="#" @click.prevent="logout">Sign Out</a></li>
          </ul>
        </details>
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
}

.brand-logo {
  font-size: 1.5rem;
  letter-spacing: -0.5px;
}

.search-input {
  margin-bottom: 0;
  height: 2.25rem;
  transition: width 0.2s;
  width: 300px;
}

/* Hide nav links on small screens */
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

.avatar {
  background: var(--pico-card-background-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--pico-muted-border-color);
  cursor: pointer;
}

summary.profile-link {
  padding: 0;
  border: none;
  background: transparent;
}

summary.profile-link::after {
  display: none;
}
</style>