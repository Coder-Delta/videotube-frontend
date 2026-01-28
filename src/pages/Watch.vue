<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import api from "@/utils/api"; // ✅ FIX
import { getAuthData } from "@/utils/cookie";
import BaseLayout from "@/components/layout/BaseLayout.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoPlayer from "@/components/video/VideoPlayer.vue";
import VideoDescription from "@/components/video/VideoDescription.vue";
import Comments from "@/components/video/Comments.vue";
import SuggestionCard from "@/components/video/SuggestionCard.vue";
import subscriptionService from "@/services/subscription.service";
import likeService from "@/services/like.service";
import playlistService from "@/services/playlist.service";
import { showToast } from "@/utils/toast";

/* -------------------- state -------------------- */
const route = useRoute();
const isLoading = ref(true);
const video = ref(null);
const error = ref(null);
const suggestions = ref([]);
const currentUser = ref(null);
const isOwner = ref(false);
const isSubscribed = ref(false);

// edit
const isEditOpen = ref(false);
const editForm = ref({ title: "", description: "" });
const thumbnailFile = ref(null);

// playlist
const isPlaylistModalOpen = ref(false);
const userPlaylists = ref([]);
const newPlaylistName = ref("");
const newPlaylistDescription = ref("");

/* -------------------- helpers -------------------- */
const getAuthHeaders = () => {
  const { token } = getAuthData();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const logError = (label, e) => {
  console.error(`[${label}]`, {
    message: e?.message,
    status: e?.response?.status,
    data: e?.response?.data,
  });
};

const checkOwner = () => {
  const { user } = getAuthData();
  if (user && video.value) {
    currentUser.value = user;
    isOwner.value = user._id === video.value.channel.id;
  }
};

/* -------------------- data fetch -------------------- */
const fetchVideoDetails = async (id) => {
  isLoading.value = true;
  error.value = null;

  try {
    // ✅ FIXED: api instance
    const res = await api.get(`/videos/${id}`, {
      headers: getAuthHeaders(),
    });

    const data = res.data?.data ?? res.data;
    const ownerObj = typeof data.owner === "object" ? data.owner : null;
    const ownerId = ownerObj?._id || data.owner;

    video.value = {
      id: data._id,
      src: data.videoFile,
      poster: data.thumbnail,
      title: data.title,
      date: new Date(data.createdAt).toLocaleDateString(),
      description: data.description,
      isPublished: data.isPublished,
      likesCount: data.likesCount || 0,
      isLiked: data.isLiked || false,
      channel: {
        id: ownerId,
        name: ownerObj?.fullName || ownerObj?.username || "Unknown Channel",
        username: ownerObj?.username || "unknown",
        avatar: ownerObj?.avatar || "",
        subscribers: "0 Subscribers",
      },
    };

    checkOwner();

    /* ---------- subscription ---------- */
    if (!isOwner.value && ownerId && currentUser.value) {
      try {
        const subRes = await subscriptionService.getUserChannelSubscribers(ownerId);
        const subs = subRes.data?.data || [];
        video.value.channel.subscribers = `${subs.length} Subscribers`;
        isSubscribed.value = subs.some(
          s => (s.subscriber?._id || s.subscriber) === currentUser.value._id
        );
      } catch (e) {
        logError("SUBSCRIPTION_CHECK", e);
      }
    }

    /* ---------- like status ---------- */
    if (currentUser.value) {
      try {
        const likedRes = await likeService.getLikedVideos();
        const likedVideos = likedRes.data?.data || [];
        video.value.isLiked = likedVideos.some(
          v => (v.video?._id || v._id) === id
        );
      } catch (e) {
        logError("LIKE_STATUS", e);
      }
    }

    /* ---------- suggestions ---------- */
    try {
      const sRes = await api.get("/videos", {
        headers: getAuthHeaders(),
      });

      const raw =
        sRes.data?.data?.videos ||
        sRes.data?.data?.docs ||
        sRes.data?.data ||
        [];

      suggestions.value = raw
        .filter(v => v && v._id !== id)
        .map(v => ({
          id: v._id,
          title: v.title,
          channel: v.owner?.username || "Cholochitro User",
          thumbnail: v.thumbnail,
        }))
        .slice(0, 10);
    } catch (e) {
      logError("SUGGESTIONS", e);
      suggestions.value = [];
    }

  } catch (e) {
    logError("FETCH_VIDEO", e);
    error.value = "Failed to load video";
  } finally {
    isLoading.value = false;
  }
};

/* -------------------- interactions -------------------- */
const handleLike = async () => {
  if (!currentUser.value) return showToast("Please log in", "error");
  try {
    await likeService.toggleVideoLike(video.value.id);
    video.value.isLiked = !video.value.isLiked;
    video.value.likesCount += video.value.isLiked ? 1 : -1;
  } catch (e) {
    logError("LIKE", e);
  }
};

const handleSubscribe = async () => {
  if (!currentUser.value) {
    return showToast("Please log in", "error");
  }

  const channelId = video.value?.channel?.id;

  if (!channelId) {
    console.error("Channel ID missing:", video.value);
    return showToast("Channel not found", "error");
  }

  try {
    await subscriptionService.toggleSubscription(channelId);
    isSubscribed.value = !isSubscribed.value;

    const current = parseInt(video.value.channel.subscribers) || 0;
    video.value.channel.subscribers = `${Math.max(
      0,
      isSubscribed.value ? current + 1 : current - 1
    )} Subscribers`;
  } catch (e) {
    logError("SUBSCRIBE", e);
    showToast("Failed to update subscription", "error");
  }
};

/* -------------------- playlist -------------------- */
const openPlaylistModal = async () => {
  isPlaylistModalOpen.value = true;
  try {
    const res = await playlistService.getMyPlaylists();
    userPlaylists.value = res.data?.data || [];
  } catch (e) {
    logError("FETCH_PLAYLISTS", e);
  }
};

const addToPlaylist = async (playlistId) => {
  try {
    await playlistService.addVideoToPlaylist(playlistId, video.value.id);
    isPlaylistModalOpen.value = false;
    showToast("Added to playlist!", "success");
  } catch (e) {
    logError("ADD_TO_PLAYLIST", e);
  }
};

const createAndAddPlaylist = async () => {
  if (!newPlaylistName.value.trim()) return;
  try {
    const res = await playlistService.createPlaylist({
      name: newPlaylistName.value,
      description: newPlaylistDescription.value,
    });
    await addToPlaylist(res.data._id);
    newPlaylistName.value = "";
    newPlaylistDescription.value = "";
  } catch (e) {
    logError("CREATE_PLAYLIST", e);
  }
};

/* -------------------- owner actions -------------------- */
const handleTogglePublish = async () => {
  await api.patch(`/videos/toggle/publish/${video.value.id}`, {}, {
    headers: getAuthHeaders(),
  });
  video.value.isPublished = !video.value.isPublished;
};

const handleDelete = async () => {
  if (!confirm("Delete this video?")) return;
  await api.delete(`/videos/${video.value.id}`, {
    headers: getAuthHeaders(),
  });
  window.location.href = "/";
};

const openEdit = () => {
  editForm.value = {
    title: video.value.title,
    description: video.value.description,
  };
  isEditOpen.value = true;
};

const handleUpdate = async () => {
  const formData = new FormData();
  formData.append("title", editForm.value.title);
  formData.append("description", editForm.value.description);
  if (thumbnailFile.value) formData.append("thumbnail", thumbnailFile.value);

  await api.patch(`/videos/${video.value.id}`, formData, {
    headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
  });

  isEditOpen.value = false;
};

/* -------------------- lifecycle -------------------- */
onMounted(() => {
  if (route.params.id) fetchVideoDetails(route.params.id);
});

watch(() => route.params.id, id => {
  if (id) fetchVideoDetails(id);
});
</script>

<template>
  <Loader v-if="isLoading" />
  <div v-else-if="error" class="error-container">
    <BaseLayout>
      <article class="error-alert">
        <h3>oops!</h3>
        <p>{{ error }}</p>
        <router-link to="/" role="button" class="secondary">Go Home</router-link>
      </article>
    </BaseLayout>
  </div>
  <BaseLayout v-else-if="video">
    <div class="grid">
      <section>
        <VideoPlayer :src="video.src" :poster="video.poster" />
        <div class="description-card">
          <VideoDescription :title="video.title" :date="video.date" :description="video.description"
            :channel="video.channel" :is-owner="isOwner" :is-published="video.isPublished" :is-subscribed="isSubscribed"
            :likes-count="video.likesCount" :is-liked="video.isLiked" @toggle-publish="handleTogglePublish"
            @delete="handleDelete" @edit="openEdit" @save-playlist="openPlaylistModal" @subscribe="handleSubscribe"
            @like="handleLike" />
        </div>

        <!-- Edit Modal -->
        <dialog :open="isEditOpen">
          <article>
            <header>
              <button aria-label="Close" rel="prev" @click="isEditOpen = false"></button>
              <h3>Edit Video</h3>
            </header>
            <form @submit.prevent="handleUpdate">
              <label>Title
                <input v-model="editForm.title" required />
              </label>
              <label>Description
                <textarea v-model="editForm.description" required rows="5"></textarea>
              </label>
              <label>Update Thumbnail
                <input type="file" @change="e => thumbnailFile = e.target.files[0]" />
              </label>
              <button type="submit">Save Changes</button>
            </form>
          </article>
        </dialog>

        <!-- Playlist Modal -->
        <dialog :open="isPlaylistModalOpen">
          <article class="playlist-modal-card">
            <header class="modal-header">
              <button aria-label="Close" rel="prev" @click="isPlaylistModalOpen = false"></button>
              <h3>Save to Playlist</h3>
            </header>

            <div class="playlist-list">
              <button v-for="pl in userPlaylists" :key="pl._id" class="secondary outline w-100 mb-2"
                @click="addToPlaylist(pl._id)">
                {{ pl.name }}
              </button>
              <div v-if="userPlaylists.length === 0" class="empty-playlists">
                No playlists found. Create one below!
              </div>
            </div>

            <div class="create-playlist-section">
              <div class="section-title">New Playlist</div>
              <label>
                Name
                <input v-model="newPlaylistName" placeholder="Enter playlist name...">
              </label>
              <label>
                Description
                <textarea v-model="newPlaylistDescription" placeholder="What's this playlist about?"
                  rows="2"></textarea>
              </label>
              <button class="create-btn" @click="createAndAddPlaylist">
                Create & Add Video
              </button>
            </div>
          </article>
        </dialog>

        <Comments :video-id="video.id" />
      </section>

      <div class="sidebar-suggestions">
        <header class="suggestions-header">
          <strong>Up Next</strong>
        </header>

        <div v-if="suggestions.length > 0" class="suggestions-list">
          <SuggestionCard v-for="item in suggestions" :key="item.id" :id="item.id" :title="item.title"
            :thumbnail="item.thumbnail" :channel="item.channel" />
        </div>
        <div v-else class="no-suggestions">
          <p>No other videos found.</p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.grid {
  grid-template-columns: 2.5fr 1fr;
  gap: 1.5rem;
}

.suggestions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}



@media (max-width: 992px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.playlist-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.w-100 {
  width: 100%;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.create-playlist-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
  background: transparent;
  border: none;
}

.create-playlist-section label {
  margin-bottom: 0;
  font-weight: 600;
  font-size: 0.9rem;
}

.create-playlist-section input,
.create-playlist-section textarea {
  margin-bottom: 0;
  background: var(--pico-background-color);
}

dialog {
  z-index: 9999;
}

.no-suggestions {
  padding: 2rem;
  text-align: center;
  color: var(--pico-muted-color);
  font-style: italic;
  background: var(--pico-secondary-background);
  border-radius: var(--pico-border-radius);
  margin-top: 1rem;
}

.error-container {
  padding: 2rem;
}

.error-alert {
  text-align: center;
  border: 1px solid var(--pico-del-color);
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}
</style>