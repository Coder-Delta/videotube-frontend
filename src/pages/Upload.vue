<script setup>
import { ref, onUnmounted } from 'vue';
import { UploadCloud, Image, Video } from 'lucide-vue-next';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import axios from 'axios';
import { showToast } from "@/utils/toast";

const isDragging = ref(false);
const isDraggingThumbnail = ref(false);
const videoFile = ref(null);
const thumbnailFile = ref(null);
const thumbnailPreview = ref(null);
const isUploading = ref(false);
const videoInputRef = ref(null);
const thumbnailInputRef = ref(null);

// New states for title and description
const title = ref('');
const description = ref('');

const handleDrop = (e) => {
    isDragging.value = false;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processVideoFile(files[0]);
    }
};

const handleDragOver = () => {
    isDragging.value = true;
};
const handleDragLeave = () => {
    isDragging.value = false;
};

const triggerVideoSelect = () => {
    videoInputRef.value.click();
};

const handleVideoSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        processVideoFile(files[0]);
    }
};

const processVideoFile = (file) => {
    if (file.type.startsWith('video/')) {
        videoFile.value = file;
        title.value = file.name.split('.').slice(0, -1).join('.');
    } else {
        showToast('Please select a valid video file.', 'error');
    }
};

// Thumbnail Logic
const handleThumbnailDrop = (e) => {
    isDraggingThumbnail.value = false;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processThumbnailFile(files[0]);
    }
};

const handleThumbnailDragOver = () => {
    isDraggingThumbnail.value = true;
};

const handleThumbnailDragLeave = () => {
    isDraggingThumbnail.value = false;
};

const triggerThumbnailSelect = () => {
    thumbnailInputRef.value.click();
};

const handleThumbnailSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        processThumbnailFile(files[0]);
    }
};

const processThumbnailFile = (file) => {
    if (file.type.startsWith('image/')) {
        // Clean up previous URL if exists
        if (thumbnailPreview.value) {
            URL.revokeObjectURL(thumbnailPreview.value);
        }
        thumbnailFile.value = file;
        thumbnailPreview.value = URL.createObjectURL(file);
    } else {
        showToast('Please select a valid image file.', 'error');
    }
};

const uploadFiles = async () => {
    if (!videoFile.value || !thumbnailFile.value) {
        showToast('Please select both a video and a thumbnail.', 'error');
        return;
    }

    if (!title.value.trim() || !description.value.trim()) {
        showToast('Please provide a title and description.', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('videoFile', videoFile.value);
    formData.append('thumbnail', thumbnailFile.value);
    formData.append('title', title.value);
    formData.append('description', description.value);

    try {
        isUploading.value = true;
        await axios.post('/api/v1/videos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        showToast('Upload successful!', 'success');
        // Reset form
        videoFile.value = null;
        thumbnailFile.value = null;
        title.value = '';
        description.value = '';
        if (thumbnailPreview.value) {
            URL.revokeObjectURL(thumbnailPreview.value);
            thumbnailPreview.value = null;
        }
    } catch (error) {
        console.error('Upload failed:', error);
        showToast('Upload failed. Please try again.', 'error');
    } finally {
        isUploading.value = false;
    }
};

// Cleanup object URL to prevent memory leaks
onUnmounted(() => {
    if (thumbnailPreview.value) {
        URL.revokeObjectURL(thumbnailPreview.value);
    }
});
</script>

<template>
    <BaseLayout>
        <div class="upload-container">
            <div class="upload-card">
                <!-- Video Selection Section -->
                <article v-if="!videoFile" class="drop-zone" :class="{ 'is-dragging': isDragging }"
                    @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop">
                    <div class="content">
                        <UploadCloud size="64" class="icon" />
                        <h3>Drag and drop video files to upload</h3>
                        <p>Your videos will be private until you publish them.</p>
                        <input type="file" ref="videoInputRef" @change="handleVideoSelect" accept="video/*"
                            style="display: none;" />
                        <button @click="triggerVideoSelect">Select Video</button>
                    </div>
                </article>

                <!-- Review and Thumbnail Section -->
                <div v-else class="preview-section">
                    <div class="video-info">
                        <Video size="48" class="icon-preview" />
                        <div>
                            <h4>{{ videoFile.name }}</h4>
                            <small>{{ (videoFile.size / (1024 * 1024)).toFixed(2) }} MB</small>
                        </div>
                        <button class="secondary outline" @click="videoFile = null">Change Video</button>
                    </div>

                    <!-- Details Section -->
                    <div class="details-section">
                        <h4>Details</h4>
                        <div class="form-group">
                            <label for="title">Title (required)</label>
                            <input type="text" id="title" v-model="title"
                                placeholder="Add a title that describes your video" required />
                        </div>
                        <div class="form-group">
                            <label for="description">Description (required)</label>
                            <textarea id="description" v-model="description" rows="4"
                                placeholder="Tell viewers about your video" required></textarea>
                        </div>
                    </div>

                    <div class="thumbnail-upload">
                        <h4>Thumbnail</h4>
                        <div class="thumbnail-drop-zone" :class="{ 'is-dragging': isDraggingThumbnail }"
                            @click="triggerThumbnailSelect" @dragover.prevent="handleThumbnailDragOver"
                            @dragleave.prevent="handleThumbnailDragLeave" @drop.prevent="handleThumbnailDrop">

                            <img v-if="thumbnailPreview" :src="thumbnailPreview" class="thumbnail-preview" />
                            <div v-else class="placeholder">
                                <Image size="32" />
                                <span>Select Thumbnail</span>
                                <small class="hint">or drag and drop</small>
                            </div>
                            <input type="file" ref="thumbnailInputRef" @change="handleThumbnailSelect" accept="image/*"
                                style="display: none;" />
                        </div>
                    </div>

                    <div class="actions">
                        <button :aria-busy="isUploading" @click="uploadFiles" class="primary">
                            {{ isUploading ? 'Uploading...' : 'Upload Video' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>
.upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 2rem;
}

.upload-card {
    width: 100%;
    max-width: 800px;
}

.drop-zone {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 2px dashed var(--pico-muted-border-color);
    border-radius: 12px;
    background: var(--pico-card-background-color);
    transition: all 0.2s ease;
}

.drop-zone.is-dragging {
    border-color: var(--pico-primary);
    background: rgba(59, 130, 246, 0.05);
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
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

.preview-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--pico-card-background-color);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.video-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--pico-secondary-background);
    border-radius: 8px;
}

.icon-preview {
    color: var(--pico-primary);
}

.details-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

label {
    font-weight: 500;
}

.thumbnail-upload h4 {
    margin-bottom: 0.5rem;
}

.thumbnail-drop-zone {
    width: 100%;
    height: 200px;
    border: 2px dashed var(--pico-muted-border-color);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s, background-color 0.2s;
}

.thumbnail-drop-zone:hover {
    border-color: var(--pico-primary);
}

.thumbnail-drop-zone.is-dragging {
    border-color: var(--pico-primary);
    background: rgba(59, 130, 246, 0.05);
}

.thumbnail-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--pico-muted-color);
}

.hint {
    font-size: 0.8rem;
    opacity: 0.7;
}

.actions {
    display: flex;
    justify-content: flex-end;
}
</style>
