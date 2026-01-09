<script setup>

</script>

<template>
  <div id="app">
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>


<style>
/* global layout styles */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 0;
  /* Let child components handle their own padding */
}
</style>
