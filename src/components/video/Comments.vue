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
import { showToast } from "@/utils/toast";

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
        const data = res.data || res;
        let commentsList = data.docs || data || [];

        // Handle unpopulated owner fields
        commentsList = commentsList.map(comment => {
            // If owner is just an ObjectId string or not populated
            if (typeof comment.owner === 'string' || !comment.owner?.username) {
                // Check if it's the current user's comment
                if (currentUser.value && (comment.owner === currentUser.value._id || comment.owner?._id === currentUser.value._id)) {
                    return {
                        ...comment,
                        owner: {
                            _id: currentUser.value._id,
                            username: currentUser.value.username,
                            fullName: currentUser.value.fullName,
                            avatar: currentUser.value.avatar
                        }
                    };
                }
                // For other users, we'll show a placeholder
                // Ideally the backend should populate this
                return {
                    ...comment,
                    owner: {
                        _id: comment.owner,
                        username: 'user',
                        fullName: 'User',
                        avatar: ''
                    }
                };
            }
            return comment;
        });

        comments.value = commentsList;
        totalComments.value = data.totalDocs || comments.value.length;
    } catch (e) {
        console.error("Failed to fetch comments", e);
    } finally {
        isLoading.value = false;
    }
};

const handleAddComment = async (content) => {
    if (!currentUser.value) return showToast("Please login to comment", 'error');
    try {
        const res = await apiAddComment(content, videoId.value);
        const newComment = res.data || res;
        // Ensure owner is populated for UI immediately
        if (!newComment.owner || typeof newComment.owner === 'string') {
            newComment.owner = {
                _id: currentUser.value._id,
                username: currentUser.value.username,
                fullName: currentUser.value.fullName,
                avatar: currentUser.value.avatar
            };
        }
        comments.value.unshift(newComment);
        totalComments.value++;
        showToast("Comment added", 'success');
    } catch (e) {
        console.error("Add comment failed", e);
        showToast("Failed to add comment", 'error');
    }
};

const handleDelete = async (commentId) => {
    try {
        await apiDeleteComment(commentId);
        comments.value = comments.value.filter(c => c._id !== commentId);
        totalComments.value--;
        showToast("Comment deleted", 'success');
    } catch (e) {
        console.error("Delete failed", e);
        showToast("Failed to delete comment", 'error');
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
        showToast("Comment updated", 'success');
    } catch (e) {
        console.error("Update failed", e);
        showToast("Failed to update comment", 'error');
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
