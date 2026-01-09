<template>
  <div class="loader-container">
    <div class="netflix-spinner"></div>
  </div>
</template>

<style scoped>
.loader-container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--pico-background-color);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.netflix-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--pico-muted-border-color);
  /* Red with opacity for track */
  border-top-color: var(--pico-primary);
  /* Netflix Red */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>