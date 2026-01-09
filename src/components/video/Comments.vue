<script setup>
import { ref } from "vue";
import CommentBox from "@/components/comments/CommentBox.vue";
import CommentItem from "@/components/comments/CommentItem.vue";

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

const addComment = (text) => {
    comments.value.unshift({
        id: Date.now(),
        user: "You",
        text: text,
        likes: 0,
        time: "Just now"
    });
};
</script>

<template>
    <section class="comments-section">
        <h4>{{ comments.length }} Comments</h4>

        <!-- Add Comment -->
        <CommentBox @add="addComment" />

        <!-- Comment List -->
        <div class="comment-list">
            <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
        </div>
    </section>
</template>

<style scoped>
.comments-section {
    margin-top: 2rem;
}
</style>
