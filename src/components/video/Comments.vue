<script setup>
import { ref } from "vue";
import { User, ThumbsUp, ThumbsDown } from "lucide-vue-next";

const comments = ref([
    {
        id: 1,
        user: "Alex Rivera",
        text: "This tutorial completely changed how I think about Vue composition API. Amazing work!",
        likes: 24,
        time: "2 hours ago"
    },
    {
        id: 2,
        user: "Sarah Chen",
        text: "Could you make a follow-up video about state management with Pinia?",
        likes: 12,
        time: "5 hours ago"
    },
    {
        id: 3,
        user: "Mike Ross",
        text: "The styling part was super clear. Pico CSS looks really promising for quick prototypes.",
        likes: 8,
        time: "1 day ago"
    }
]);

const newComment = ref("");

const addComment = () => {
    if (!newComment.value.trim()) return;
    comments.value.unshift({
        id: Date.now(),
        user: "You",
        text: newComment.value,
        likes: 0,
        time: "Just now"
    });
    newComment.value = "";
};
</script>

<template>
    <section class="comments-section">
        <h4>{{ comments.length }} Comments</h4>

        <!-- Add Comment -->
        <div class="add-comment">
            <textarea v-model="newComment" placeholder="Add a comment..." rows="2"></textarea>
            <div class="actions">
                <button class="secondary outline" :disabled="!newComment" @click="newComment = ''">Cancel</button>
                <button :disabled="!newComment" @click="addComment">Comment</button>
            </div>
        </div>

        <!-- Comment List -->
        <div class="comment-list">
            <article v-for="comment in comments" :key="comment.id" class="comment-item">
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
        </div>
    </section>
</template>

<style scoped>
.comments-section {
    margin-top: 2rem;
}

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
