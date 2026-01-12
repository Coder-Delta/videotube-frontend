<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import {
    getVideoComments,
    addComment as apiAddComment,
    deleteComment as apiDeleteComment,
    updateComment as apiUpdateComment
} from "@/services/comment.service";
import { getAuthData } from "@/utils/cookie";
import CommentBox from "@/components/comments/CommentBox.vue";
import CommentItem from "@/components/comments/CommentItem.vue";

const route = useRoute();
const comments = ref([]);
const totalComments = ref(0);
const currentUser = ref(null);
const isLoading = ref(false);

const props = defineProps({
    videoId: { type: String, default: "" }
});

const videoId = ref(props.videoId || route.params.id);

const checkUser = () => {
    const { user } = getAuthData();
    currentUser.value = user || null;
};

const fetchComments = async () => {
    if (!videoId.value) return;
    isLoading.value = true;
    try {
        const res = await getVideoComments(videoId.value);
        // Backend returns standard response structure? 
        // Service returns response.data. Usually data.data contains list. 
        // Comment service: return response.data.
        // Let's assume response.data is { data: { docs: [...], totalDocs: ... } } or similar
        // Looking at previous patterns, it's often res.data.data
        const data = res.data || res;
        comments.value = data.docs || data || [];
        totalComments.value = data.totalDocs || comments.value.length;
    } catch (e) {
        console.error("Failed to fetch comments", e);
    } finally {
        isLoading.value = false;
    }
};

const handleAddComment = async (content) => {
    if (!currentUser.value) return alert("Please login to comment");
    try {
        const res = await apiAddComment(content, videoId.value);
        // Optimistic append or re-fetch?
        // Service returns the new comment.
        const newComment = res.data || res;
        // Ensure owner is populated for UI immediately
        if (!newComment.owner) {
            newComment.owner = currentUser.value;
        }
        comments.value.unshift(newComment);
        totalComments.value++;
    } catch (e) {
        console.error("Add comment failed", e);
    }
};

const handleDelete = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
        await apiDeleteComment(commentId);
        comments.value = comments.value.filter(c => c._id !== commentId);
        totalComments.value--;
    } catch (e) {
        console.error("Delete failed", e);
    }
};

const handleUpdate = async (commentId, content) => {
    try {
        const res = await apiUpdateComment(commentId, content);
        const updated = res.data || res;
        const index = comments.value.findIndex(c => c._id === commentId);
        if (index !== -1) {
            comments.value[index].content = updated.content;
        }
    } catch (e) {
        console.error("Update failed", e);
    }
};

onMounted(() => {
    checkUser();
    fetchComments();
});

watch(() => props.videoId, (val) => {
    if (val) {
        videoId.value = val;
        fetchComments();
    }
});
</script>

<template>
    <section class="comments-section">
        <h4>{{ totalComments }} Comments</h4>

        <!-- Add Comment -->
        <CommentBox @add="handleAddComment" />

        <!-- Loading -->
        <div v-if="isLoading" class="loading">Loading comments...</div>

        <!-- Comment List -->
        <div v-else class="comment-list">
            <CommentItem v-for="comment in comments" :key="comment._id" :comment="comment"
                :is-owner="currentUser && (currentUser._id === (comment.owner?._id || comment.owner))"
                @delete="handleDelete" @update="handleUpdate" />
            <div v-if="comments.length === 0" class="empty-state">
                <p>No comments yet. Be the first to start the conversation!</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.comments-section {
    margin-top: 2rem;
}

.loading {
    text-align: center;
    padding: 1rem;
    color: var(--pico-muted-color);
}

.empty-state {
    text-align: center;
    padding: 2rem;
    color: var(--pico-muted-color);
    font-style: italic;
}
</style>
