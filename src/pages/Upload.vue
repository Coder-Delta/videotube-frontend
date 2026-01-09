<script setup>
import { ref } from 'vue';
import { UploadCloud } from 'lucide-vue-next';
import BaseLayout from '@/components/layout/BaseLayout.vue';

const isDragging = ref(false);

const handleDrop = (e) => {
    isDragging.value = false;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        console.log("File dropped:", files[0].name);
        // Handle file upload logic here in future
    }
};

const handleDragOver = () => {
    isDragging.value = true;
};
const handleDragLeave = () => {
    isDragging.value = false;
};
</script>

<template>
    <BaseLayout>
        <div class="upload-container">
            <article class="drop-zone" :class="{ 'is-dragging': isDragging }" @dragover.prevent="handleDragOver"
                @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
                <div class="content">
                    <UploadCloud size="64" class="icon" />
                    <h3>Drag and drop video files to upload</h3>
                    <p>Your videos will be private until you publish them.</p>
                    <button>Select Files</button>
                </div>
            </article>
        </div>
    </BaseLayout>
</template>

<style scoped>
.upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
}

.drop-zone {
    width: 100%;
    max-width: 800px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px dashed var(--pico-muted-border-color);
    background: transparent;
    transition: all 0.2s ease;
}

.drop-zone.is-dragging {
    border-color: var(--pico-primary);
    background: rgba(59, 130, 246, 0.05);
    /* Very subtle primary tint */
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.icon {
    color: var(--pico-muted-color);
    margin-bottom: 0.5rem;
}

h3 {
    margin-bottom: 0;
}

p {
    color: var(--pico-muted-color);
    margin-bottom: 1.5rem;
}
</style>
