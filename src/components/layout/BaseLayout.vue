<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
    <div class="layout-wrapper">
        <Navbar />
        <main class="container-fluid page-content">
            <slot />
        </main>
        <Footer />
    </div>
</template>

<style scoped>
.layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.page-content {
    flex: 1;
    padding: 1rem;
    width: 100%;
}
</style>
