<script setup>
import { onMounted } from 'vue';
import { getCookie } from '@/utils/cookie';
import ToastNotification from '@/components/layout/ToastNotification.vue';
import { toastState } from '@/utils/toast';

onMounted(() => {
  const savedTheme = getCookie('pico_theme') || 'auto';
  if (savedTheme && savedTheme !== 'auto') {
    document.querySelector('html').setAttribute('data-theme', savedTheme);
  } else {
    document.querySelector('html').removeAttribute('data-theme');
  }
});
</script>

<template>
  <div id="app">
    <main class="main-content">
      <router-view />
    </main>
    <ToastNotification :show="toastState.show" :message="toastState.message" :type="toastState.type" />
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
