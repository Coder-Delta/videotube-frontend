<script setup>
import { User, ThumbsUp, ThumbsDown } from "lucide-vue-next";

defineProps({
    comment: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <article class="comment-item">
        <div class="avatar">
            <User size="24" />
        </div>
        <div class="body">
            <div class="header">
                <strong>{{ comment.user }}</strong>
                <small>{{ comment.time }}</small>
            </div>
            <p>{{ comment.text }}</p>
            <div class="footer">
                <button class="icon-btn">
                    <ThumbsUp size="14" /> {{ comment.likes }}
                </button>
                <button class="icon-btn">
                    <ThumbsDown size="14" />
                </button>
                <button class="text-btn">Reply</button>
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