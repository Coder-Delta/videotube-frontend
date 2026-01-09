<script setup>
/**
 * No logic needed for a pure CSS beautiful loader, 
 * but you could add a 'progress' prop here later!
 */
</script>

<template>
  <div class="loader-container">
    <article aria-busy="true">
      Loading ...
    </article>
  </div>
</template>

<style scoped>
.loader-container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>