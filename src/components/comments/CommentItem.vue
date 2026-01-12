<script setup>
import { ref } from "vue";
import { ThumbsUp } from "lucide-vue-next";

const props = defineProps({
    comment: { type: Object, required: true },
    isOwner: { type: Boolean, default: false }
});

const emit = defineEmits(['delete', 'update']);

const isEditing = ref(false);
const editContent = ref("");

const startEdit = () => {
    editContent.value = props.comment.content;
    isEditing.value = true;
};

const cancelEdit = () => {
    isEditing.value = false;
    editContent.value = "";
};

const saveEdit = () => {
    if (editContent.value.trim() !== props.comment.content) {
        emit('update', props.comment._id, editContent.value);
    }
    isEditing.value = false;
};

const timeAgo = (date) => {
    try {
        const now = new Date();
        const past = new Date(date);
        const seconds = Math.floor((now - past) / 1000);

        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
        const years = Math.floor(months / 12);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } catch (e) {
        return "";
    }
};
</script>


<template>
    <article class="comment-item">
        <div class="avatar">
            <img v-if="comment.owner?.avatar" :src="comment.owner.avatar" class="avatar-img" />
            <span v-else>{{ (comment.owner?.fullName?.[0] || comment.owner?.username?.[0] || 'U').toUpperCase()
                }}</span>
        </div>
        <div class="body">
            <div class="header">
                <strong>@{{ comment.owner?.username || 'unknown' }}</strong>
                <small>{{ timeAgo(comment.createdAt) }}</small>
            </div>

            <div v-if="isEditing" class="edit-mode">
                <textarea v-model="editContent" rows="3"></textarea>
                <div class="edit-actions">
                    <button class="outline secondary sm" @click="cancelEdit">Cancel</button>
                    <button class="sm" @click="saveEdit" :disabled="!editContent.trim()">Save</button>
                </div>
            </div>
            <p v-else>{{ comment.content }}</p>

            <div class="footer">
                <button class="icon-btn">
                    <ThumbsUp size="14" /> {{ comment.likesCount || 0 }}
                </button>
                <!-- Only show actions if owner -->
                <template v-if="isOwner && !isEditing">
                    <button class="text-btn" @click="startEdit">Edit</button>
                    <button class="text-btn" @click="$emit('delete', comment._id)">Delete</button>
                </template>
            </div>
        </div>
    </article>
</template>

<style scoped>
.comment-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    background: transparent;
    box-shadow: none;
    padding: 0;
    border: none;
}

.avatar {
    width: 40px;
    height: 40px;
    background: var(--pico-card-background-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-weight: 600;
    font-size: 1rem;
    color: var(--pico-primary);
    overflow: hidden;
}

.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.body {
    flex: 1;
}

.header {
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
    margin-bottom: 0.25rem;
}

.header small {
    color: var(--pico-muted-color);
}

.edit-mode {
    margin: 0.5rem 0;
}

.edit-mode textarea {
    width: 100%;
    margin-bottom: 0.5rem;
}

.edit-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.edit-actions button {
    width: auto;
    padding: 0.4rem 1rem;
    font-size: 0.875rem;
}

.sm {
    padding: 0.4rem 1rem;
    font-size: 0.875rem;
    width: auto;
}

.footer {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
}

.icon-btn,
.text-btn {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.8rem;
    color: var(--pico-muted-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width: auto;
}

.icon-btn:hover,
.text-btn:hover {
    color: var(--pico-primary);
}
</style>