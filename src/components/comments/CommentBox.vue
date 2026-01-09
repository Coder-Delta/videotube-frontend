<script setup>
import { ref } from "vue";

const emit = defineEmits(['add']);
const newComment = ref("");

const submitComment = () => {
    if (!newComment.value.trim()) return;
    emit('add', newComment.value);
    newComment.value = "";
};
</script>

<template>
    <div class="add-comment">
        <textarea v-model="newComment" placeholder="Add a comment..." rows="2"></textarea>
        <div class="actions">
            <button class="secondary outline" :disabled="!newComment" @click="newComment = ''">Cancel</button>
            <button :disabled="!newComment" @click="submitComment">Comment</button>
        </div>
    </div>
</template>

<style scoped>
.add-comment {
    margin-bottom: 2rem;
}

.add-comment .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.add-comment button {
    width: auto;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
}
</style>