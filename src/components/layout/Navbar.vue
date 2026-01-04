<script setup>
</script>

<template>
  <header class="navbar">
    <!-- Left -->
    <div class="navbar-left">
      <span class="logo">Videotube</span>
    </div>

    <!-- Center -->
    <div class="navbar-center">
      <input type="text" placeholder="Search" class="search-input" />
      <button class="search-btn">Search</button>
    </div>

    <!-- Right -->
    <div class="navbar-right">
      <a href="#">Login</a>
      <a href="#">Signup</a>
    </div>
  </header>
</template>

<style scoped>
/* Navbar container */
.navbar {
  height: 64px;
  padding: 0 20px;
  background-color: #0f172a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Left */
.logo {
  font-size: 20px;
  font-weight: 600;
}

/* Center (Search) */
.navbar-center {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-input {
  width: 240px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: #020617;
  color: #ffffff;
  outline: none;
}

.search-input::placeholder {
  color: #94a3b8;
}

.search-btn {
  padding: 6px 14px;
  border-radius: 4px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

.search-btn:hover {
  background: #1d4ed8;
}

/* Right */
.navbar-right {
  display: flex;
  gap: 16px;
}

.navbar-right a {
  color: #cbd5f5;
  text-decoration: none;
  font-size: 14px;
}

.navbar-right a:hover {
  color: #ffffff;
}
</style>
