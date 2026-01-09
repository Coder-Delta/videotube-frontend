<script setup>
const navLinks = [
  { label: 'Home' },
  { label: 'Trending' },
  { label: 'Subscriptions' },
  { label: 'Library' }
];
</script>

<template>
  <nav class="container-fluid">
    <!-- Left: Brand + Nav -->
    <ul>
      <li><strong>VideoTube</strong></li>
      <li v-for="(link, i) in navLinks" :key="i" class="hidden-mobile">
        <a href="#" class="secondary">{{ link.label }}</a>
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
      <li><a href="#" class="secondary">Upload</a></li>
      <li><router-link to="/login" role="button">Sign In</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  border-bottom: 1px solid var(--pico-muted-border-color);
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
</style>