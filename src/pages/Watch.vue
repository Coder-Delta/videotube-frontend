<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';
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
    const res = await axios.get(`/api/v1/videos/${id}`, {
      headers: getAuthHeaders(),
    });

    const data = res.data?.data ?? res.data;
    const ownerObj = typeof data.owner === "object" ? data.owner : null;
    const ownerId = ownerObj ? ownerObj._id : data.owner;

    video.value = {
      id: data._id,
      src: data.videoFile,
      poster: data.thumbnail,
      title: data.title,
      // views removed
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

    if (!isOwner.value && currentUser.value) {
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

    // Fetch Suggestions
    try {
      const sRes = await axios.get("/api/v1/videos", {
        headers: getAuthHeaders(),
      });
      const sData = sRes.data;
      let raw = [];

      // Robust data extraction
      if (Array.isArray(sData)) {
        raw = sData;
      } else if (sData && Array.isArray(sData.data)) {
        raw = sData.data;
      } else if (sData?.data?.videos && Array.isArray(sData.data.videos)) {
        raw = sData.data.videos;
      } else if (sData?.data?.docs && Array.isArray(sData.data.docs)) {
        raw = sData.data.docs;
      } else if (sData?.docs && Array.isArray(sData.docs)) {
        raw = sData.docs;
      }

      suggestions.value = raw
        .filter(v => v && v._id !== id)
        .map(v => ({
          id: v._id,
          title: v.title,
          channel: v.owner?.username || "Cholochitro User",
          // views removed
          time: new Date(v.createdAt).toLocaleDateString(),
          duration: v.duration ? (v.duration / 60).toFixed(2) : "00:00",
          thumbnail: v.thumbnail,
        }));

      // Fallback with mock data if still empty
      if (suggestions.value.length === 0) {
        suggestions.value = [
          { id: 'mock1', title: 'Top 10 Vue.js Tips', channel: 'VueMastery', time: '2 days ago', duration: '10:05', thumbnail: 'https://img.youtube.com/vi/qZXt1Aom3Cs/maxresdefault.jpg' },
          { id: 'mock2', title: 'Why composition API?', channel: 'CodeWithMe', time: '1 week ago', duration: '08:30', thumbnail: 'https://img.youtube.com/vi/bziTPstK5Q0/maxresdefault.jpg' },
          { id: 'mock3', title: 'Learn Pinia in 15 mins', channel: 'WebDevSimplified', time: '3 days ago', duration: '15:20', thumbnail: 'https://img.youtube.com/vi/u0ZcCf7f0Oc/maxresdefault.jpg' }
        ];
      }

    } catch (sError) {
      console.warn("Suggestions fetch failed, using fallback", sError);
      suggestions.value = [
        { id: 'mock1', title: 'Top 10 Vue.js Tips', channel: 'VueMastery', time: '2 days ago', duration: '10:05', thumbnail: 'https://img.youtube.com/vi/qZXt1Aom3Cs/maxresdefault.jpg' },
        { id: 'mock2', title: 'Why composition API?', channel: 'CodeWithMe', time: '1 week ago', duration: '08:30', thumbnail: 'https://img.youtube.com/vi/bziTPstK5Q0/maxresdefault.jpg' },
        { id: 'mock3', title: 'Learn Pinia in 15 mins', channel: 'WebDevSimplified', time: '3 days ago', duration: '15:20', thumbnail: 'https://img.youtube.com/vi/u0ZcCf7f0Oc/maxresdefault.jpg' }
      ];
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
  if (!currentUser.value) return alert("Please log in");
  try {
    await likeService.toggleVideoLike(video.value.id);
    video.value.isLiked = !video.value.isLiked;
    video.value.likesCount += video.value.isLiked ? 1 : -1;
  } catch (e) {
    logError("LIKE", e);
  }
};

const handleSubscribe = async () => {
  if (!currentUser.value) return alert("Please log in");
  try {
    await subscriptionService.toggleSubscription(video.value.channel.id);
    isSubscribed.value = !isSubscribed.value;
  } catch (e) {
    logError("SUBSCRIBE", e);
  }
};

/* -------------------- playlist -------------------- */
const openPlaylistModal = async () => {
  isPlaylistModalOpen.value = true;
  try {
    const res = await playlistService.getMyPlaylists();
    userPlaylists.value = res.data?.data || res.data || [];
  } catch (e) {
    logError("FETCH_PLAYLISTS", e);
  }
};

const addToPlaylist = async (playlistId) => {
  try {
    await playlistService.addVideoToPlaylist(playlistId, video.value.id);
    isPlaylistModalOpen.value = false;
    alert("Added to playlist!");
  } catch (e) {
    logError("ADD_TO_PLAYLIST", e);
    alert("Failed to add to playlist");
  }
};

const createAndAddPlaylist = async () => {
  const name = newPlaylistName.value.trim();
  const description = newPlaylistDescription.value.trim();
  if (!name) return;

  try {
    const res = await playlistService.createPlaylist({ name, description });
    const id = res.data?._id || res?._id;
    if (!id) throw new Error("Playlist id missing");
    await addToPlaylist(id);
    newPlaylistName.value = "";
    newPlaylistDescription.value = "";
  } catch (e) {
    logError("CREATE_PLAYLIST", e);
    alert("Failed to create/add playlist");
  }
};

/* -------------------- owner actions -------------------- */
const handleTogglePublish = async () => {
  try {
    await axios.patch(
      `/api/v1/videos/toggle/publish/${video.value.id}`,
      {},
      { headers: getAuthHeaders() }
    );
    video.value.isPublished = !video.value.isPublished;
  } catch (e) {
    logError("TOGGLE_PUBLISH", e);
  }
};

const handleDelete = async () => {
  if (!confirm("Delete this video?")) return;
  try {
    await axios.delete(`/api/v1/videos/${video.value.id}`, {
      headers: getAuthHeaders(),
    });
    window.location.href = "/";
  } catch (e) {
    logError("DELETE_VIDEO", e);
  }
};

const openEdit = () => {
  editForm.value = {
    title: video.value.title,
    description: video.value.description,
  };
  isEditOpen.value = true;
};

const handleUpdate = async () => {
  try {
    const formData = new FormData();
    formData.append("title", editForm.value.title);
    formData.append("description", editForm.value.description);
    if (thumbnailFile.value) {
      formData.append("thumbnail", thumbnailFile.value);
    }

    const res = await axios.patch(
      `/api/v1/videos/${video.value.id}`,
      formData,
      { headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" } }
    );

    const updated = res.data?.data;
    video.value.title = updated.title;
    video.value.description = updated.description;
    if (updated.thumbnail) video.value.poster = updated.thumbnail;
    isEditOpen.value = false;
  } catch (e) {
    logError("UPDATE_VIDEO", e);
    alert("Failed to update video");
  }
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
          <label class="autoplay-toggle">
            Autoplay
            <input type="checkbox" role="switch" checked />
          </label>
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

.autoplay-toggle {
  margin-bottom: 0;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--pico-muted-color);
  font-weight: 600;
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