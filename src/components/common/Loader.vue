<script setup>
</script>

<template>
    <div class="loader-wrapper">
        <div class="loader"></div>
        <p class="loading-text">Loading...</p>
    </div>
</template>

<style scoped>
/* Center loader on screen */
.loader-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #020617;
    color: #e5e7eb;
}

/* Spinner */
.loader {
    width: 48px;
    height: 48px;
    border: 4px solid #1e293b;
    border-top: 4px solid #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Text */
.loading-text {
    margin-top: 12px;
    font-size: 14px;
    color: #9ca3af;
}

/* Animation */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
