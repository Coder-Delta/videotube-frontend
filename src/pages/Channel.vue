<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { CheckCircle2, MoreVertical, Trash2, Edit, Plus, FolderPlus } from "lucide-vue-next";
import { getAuthData } from "@/utils/cookie";
import axios from 'axios';
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/layout/Loader.vue";
import VideoCard from "@/components/video/VideoCard.vue";

const route = useRoute();
const isLoading = ref(true);
const activeTab = ref("Videos");

import subscriptionService from "@/services/subscription.service";

const channel = ref({
  id: "",
  name: "",
  username: "",
  subscribers: "0",
  subscribersCount: 0, // Numeric for manipulation
  description: "",
  avatar: "",
  coverImage: "",
  videosCount: "0 videos"
});

const videos = ref([]);
const playlists = ref([]);
const tweets = ref([]);
const isOwner = ref(false);
const isSubscribed = ref(false);
const currentUser = ref(null);

// Forms
const isTweetModalOpen = ref(false);
const tweetContent = ref("");
const isPlaylistModalOpen = ref(false);
const playlistForm = ref({ name: "", description: "" });

const tabs = ["Videos", "Playlists", "Community"];

const checkOwner = () => {
  const { user } = getAuthData();
  if (user) {
    currentUser.value = user;
    // Determine ownership based on API data usually, but for now:
    // We need the channel ID to match current user ID.
    // Or if we are navigating by username, match usernames.
    if (channel.value.username === `@${currentUser.value.username}`) {
      isOwner.value = true;
    }
  }
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const username = route.params.username;
    const { token } = getAuthData();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // 1. Fetch Channel Profile
    const channelRes = await axios.get(`/api/v1/users/c/${username}`, { headers });
    const data = channelRes.data.data;
    channel.value = {
      id: data._id,
      name: data.fullName,
      username: `@${data.username}`,
      subscribers: `${data.subscribersCount} subscribers`,
      subscribersCount: data.subscribersCount,
      description: "Visual storytelling through high-fidelity digital experiences.",
      avatar: data.avatar,
      coverImage: data.coverImage,
      videosCount: `${data.channelsSubscribedToCount} videos`
    };

    checkOwner();

    // 1b. Check Subscription Status (if not owner and logged in)
    if (!isOwner.value && currentUser.value) {
      // Fetch subscribers list to check if I am in it
      // Note: In a real app with millions of subs, the backend should provide 'isSubscribed' boolean.
      // For this specific API contract (getUserChannelSubscribers returns list), we'll try to find ourselves.
      try {
        const subRes = await subscriptionService.getUserChannelSubscribers(data._id);
        const subList = subRes.data.data || [];
        // Update count from source of truth
        channel.value.subscribersCount = subList.length;
        channel.value.subscribers = `${subList.length} subscribers`;

        isSubscribed.value = subList.some(sub => (sub.subscriber?._id || sub.subscriber) === currentUser.value._id);
      } catch (e) {
        console.warn("Failed to fetch subscription status", e);
      }
    }

    // 2. Fetch Content
    if (activeTab.value === 'Videos') await fetchVideos(data._id);
    else if (activeTab.value === 'Playlists') await fetchPlaylists(data._id);
    else if (activeTab.value === 'Community') await fetchTweets(data._id);

  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const handleSubscribe = async () => {
  if (!currentUser.value) {
    alert("Please log in to subscribe.");
    return;
  }
  try {
    await subscriptionService.toggleSubscription(channel.value.id);
    isSubscribed.value = !isSubscribed.value;

    // Optimistic update
    if (isSubscribed.value) {
      channel.value.subscribersCount++;
    } else {
      channel.value.subscribersCount--;
    }
    channel.value.subscribers = `${channel.value.subscribersCount} subscribers`;

  } catch (e) {
    alert("Failed to update subscription");
  }
};

const fetchVideos = async (userId) => {
  // Assuming we have an endpoint for user videos or general video filter
  try {
    const res = await axios.get(`/api/v1/videos?userId=${userId}`); // Hypothetical, or just get all and filter
    // Actually the backend provided route `getAllVideos` probably supports query params or we filter client side
    // given the previous turns. Let's use the one that worked for Home/MyChannel.
    // Previous MyChannel used client-side filtering. Let's do that for consistency if no specific endpoint.
    const allRes = await axios.get('/api/v1/videos');

    let alllist = [];
    const data = allRes.data;

    if (Array.isArray(data)) {
      alllist = data;
    } else if (data && Array.isArray(data.data)) {
      alllist = data.data;
    } else if (data && data.data && Array.isArray(data.data.videos)) {
      alllist = data.data.videos;
    } else if (data && data.data && Array.isArray(data.data.docs)) {
      alllist = data.data.docs;
    } else if (data && Array.isArray(data.docs)) {
      alllist = data.docs;
    }

    // Filter
    videos.value = alllist.filter(v => (v.owner?._id || v.owner) === userId).map(v => ({
      id: v._id,
      title: v.title,
      thumbnail: v.thumbnail,
      views: v.views ? `${v.views} views` : "0 views",
      time: new Date(v.createdAt).toLocaleDateString(),
      duration: v.duration ? (v.duration / 60).toFixed(2) : "00:00",
      isPublished: v.isPublished
    }));
  } catch (e) { console.error(e); }
};

const fetchPlaylists = async (userId) => {
  try {
    const res = await axios.get(`/api/v1/playlist/user/${userId}`);
    playlists.value = res.data.data || [];
  } catch (e) {
    console.error("Failed to fetch playlists");
    playlists.value = [];
  }
};

const fetchTweets = async (userId) => {
  try {
    const res = await axios.get(`/api/v1/tweets/user/${userId}`);
    tweets.value = res.data.data || [];
  } catch (e) {
    console.error("Failed to fetch tweets");
    tweets.value = [];
  }
};

// Actions
const createTweet = async () => {
  try {
    const { token } = getAuthData();
    await axios.post('/api/v1/tweets', { content: tweetContent.value }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    tweetContent.value = "";
    isTweetModalOpen.value = false;
    fetchTweets(channel.value.id); // refresh
  } catch (e) { alert('Failed to post tweet'); }
};

const deleteTweet = async (id) => {
  if (!confirm("Delete this post?")) return;
  try {
    const { token } = getAuthData();
    await axios.delete(`/api/v1/tweets/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    tweets.value = tweets.value.filter(t => t._id !== id);
  } catch (e) { alert('Failed'); }
};

const createPlaylist = async () => {
  try {
    const { token } = getAuthData();
    await axios.post('/api/v1/playlist', playlistForm.value, {
      headers: { Authorization: `Bearer ${token}` }
    });
    playlistForm.value = { name: "", description: "" };
    isPlaylistModalOpen.value = false;
    fetchPlaylists(channel.value.id);
  } catch (e) { alert('Failed to create playlist'); }
};

const deletePlaylist = async (id) => {
  if (!confirm("Delete this playlist?")) return;
  try {
    const { token } = getAuthData();
    await axios.delete(`/api/v1/playlist/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    playlists.value = playlists.value.filter(p => p._id !== id);
  } catch (e) { alert('Failed'); }
};

// Video actions (Owner Only)
const deleteVideo = async (id) => {
  if (!confirm("Delete video?")) return;
  try {
    const { token } = getAuthData();
    await axios.delete(`/api/v1/videos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    videos.value = videos.value.filter(v => v.id !== id);
  } catch (e) { alert("Failed to delete"); }
};

// Watchers
watch(() => route.params.username, fetchData);
watch(activeTab, () => fetchData());

onMounted(() => {
  fetchData();
});
</script>

<template>
  <Loader v-if="isLoading" />

  <div v-else>
    <Navbar />

    <!-- Cover -->
    <div class="cover-container">
      <img v-if="channel.coverImage" :src="channel.coverImage" alt="Cover" class="cover-img" />
      <div v-else class="cover-placeholder"></div>
    </div>

    <main class="container">
      <!-- Header -->
      <header class="channel-header">
        <div class="avatar-col">
          <img v-if="channel.avatar" :src="channel.avatar" alt="Avatar" class="avatar-img" />
          <div v-else class="avatar-placeholder">{{ channel.name ? channel.name.charAt(0) : 'U' }}</div>
        </div>

        <div class="info-col">
          <h1>{{ channel.name }}
            <CheckCircle2 :size="20" fill="var(--pico-primary)" color="var(--pico-background-color)" />
          </h1>
          <div class="meta">
            <span>{{ channel.username }}</span> • <span>{{ channel.subscribers }}</span> • <span>{{
              channel.videosCount }}</span>
          </div>
          <p class="desc">{{ channel.description }}</p>

          <div class="actions">
            <button v-if="!isOwner" class="subscribe-btn" :class="{ 'outline': isSubscribed }" @click="handleSubscribe">
              {{ isSubscribed ? 'Subscribed' : 'Subscribe' }}
            </button>
            <div v-else class="owner-tools">
              <button class="outline secondary" @click="$router.push('/settings')">Edit Profile</button>
              <button v-if="activeTab === 'Community'" class="outline" @click="isTweetModalOpen = true">
                <Plus size="16" /> New Post
              </button>
              <button v-if="activeTab === 'Playlists'" class="outline" @click="isPlaylistModalOpen = true">
                <FolderPlus size="16" /> New Playlist
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Tabs -->
      <div class="tabs">
        <a v-for="tab in tabs" :key="tab" :class="{ active: activeTab === tab }" @click="activeTab = tab">{{ tab }}</a>
      </div>

      <!-- VIDEOS TAB -->
      <div v-if="activeTab === 'Videos'" class="video-grid">
        <div v-for="video in videos" :key="video.id" class="video-item-wrapper">
          <VideoCard :id="video.id" :title="video.title" :thumbnail="video.thumbnail" :views="video.views"
            :time="video.time" :duration="video.duration" :channel="channel.name" />
          <div v-if="isOwner" class="owner-overlay">
            <button class="icon-btn-danger" @click="deleteVideo(video.id)" title="Delete">
              <Trash2 size="16" />
            </button>
            <router-link :to="`/watch/${video.id}`" class="icon-btn-edit" title="Edit">
              <Edit size="16" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- PLAYLISTS TAB -->
      <div v-else-if="activeTab === 'Playlists'" class="grid-playlists">
        <div v-for="playlist in playlists" :key="playlist._id" class="playlist-card"
          @click="$router.push(`/playlist/${playlist._id}`)">
          <div class="pl-thumb">
            <div class="pl-overlay">
              <span>{{ playlist.name }}</span>
              <small>{{ (playlist.videos || playlist.video || []).length }} videos</small>
            </div>
          </div>
          <div class="pl-meta">
            <h4>{{ playlist.name }}</h4>
            <button v-if="isOwner" class="icon-btn-danger sm" @click.stop="deletePlaylist(playlist._id)">Delete</button>
          </div>
        </div>
        <div v-if="playlists.length === 0" class="empty-state">No playlists found.</div>
      </div>

      <!-- COMMUNITY TAB -->
      <div v-else-if="activeTab === 'Community'" class="community-feed">
        <div v-for="tweet in tweets" :key="tweet._id" class="tweet-card">
          <header>
            <div class="tweet-user">
              <img v-if="channel.avatar" :src="channel.avatar" class="tweet-avatar" />
              <strong>{{ channel.name }}</strong>
              <small>{{ new Date(tweet.createdAt).toLocaleDateString() }}</small>
            </div>
            <button v-if="isOwner" class="icon-btn-danger sm" @click="deleteTweet(tweet._id)">
              <Trash2 size="14" />
            </button>
          </header>
          <p>{{ tweet.content }}</p>
        </div>
        <div v-if="tweets.length === 0" class="empty-state">No community posts yet.</div>
      </div>

    </main>

    <!-- Modals -->
    <dialog :open="isTweetModalOpen">
      <article>
        <header><button @click="isTweetModalOpen = false" rel="prev"></button>
          <h3>New Community Post</h3>
        </header>
        <textarea v-model="tweetContent" placeholder="What's on your mind?"></textarea>
        <footer><button @click="createTweet">Post</button></footer>
      </article>
    </dialog>

    <dialog :open="isPlaylistModalOpen">
      <article>
        <header><button @click="isPlaylistModalOpen = false" rel="prev"></button>
          <h3>Create Playlist</h3>
        </header>
        <label>Name<input v-model="playlistForm.name"></label>
        <label>Description<input v-model="playlistForm.description"></label>
        <footer><button @click="createPlaylist">Create</button></footer>
      </article>
    </dialog>

    <Footer />
  </div>
</template>

<style scoped>
/* Minimalist & Clean Styles */
.cover-container {
  width: 100%;
  height: 200px;
  background: var(--pico-muted-border-color);
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #333, #444);
}

.channel-header {
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  align-items: flex-start;
}

.avatar-col img,
.avatar-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  background: var(--pico-card-background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: var(--pico-primary);
  border: 2px solid var(--pico-muted-border-color);
}

.info-col h1 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
}

.meta {
  color: var(--pico-muted-color);
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.desc {
  color: var(--pico-muted-color);
  font-size: 0.95rem;
  max-width: 600px;
  margin-bottom: 1rem;
}

.actions {
  margin-top: 1rem;
}

.owner-tools {
  display: flex;
  gap: 0.5rem;
}

.subscribe-btn {
  border-radius: 99px;
  padding: 0.5rem 1.5rem;
  width: auto;
  font-weight: 600;
}

.tabs {
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid var(--pico-muted-border-color);
  margin-bottom: 2rem;
}

.tabs a {
  padding: 0.75rem 0;
  cursor: pointer;
  color: var(--pico-muted-color);
  font-weight: 500;
  border-bottom: 2px solid transparent;
}

.tabs a:hover {
  color: var(--pico-color);
}

.tabs a.active {
  color: var(--pico-color);
  border-bottom-color: var(--pico-color);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding-bottom: 4rem;
}

/* Owner Video Management */
.video-item-wrapper {
  position: relative;
}

.owner-overlay {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.2s;
}

.video-item-wrapper:hover .owner-overlay {
  opacity: 1;
}

.icon-btn-danger,
.icon-btn-edit {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
}

.icon-btn-danger:hover {
  background: var(--pico-del-color);
}

.icon-btn-edit:hover {
  background: var(--pico-primary);
}


/* Playlists */
.grid-playlists {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.playlist-card {
  background: var(--pico-card-background-color);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.playlist-card:hover {
  transform: translateY(-2px);
}

.pl-thumb {
  height: 150px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  background-size: cover;
  /* In case we add bg image later */
}

.pl-overlay {
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.pl-meta {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pl-meta h4 {
  margin: 0;
  font-size: 1rem;
}

/* Community */
.community-feed {
  max-width: 700px;
}

.tweet-card {
  background: var(--pico-card-background-color);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid var(--pico-muted-border-color);
}

.tweet-card header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.tweet-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tweet-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.empty-state {
  padding: 4rem;
  text-align: center;
  color: var(--pico-muted-color);
}

@media (max-width: 768px) {
  .channel-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-col h1 {
    justify-content: center;
  }

  .cover-container {
    height: 120px;
  }

  .avatar-col img,
  .avatar-placeholder {
    width: 100px;
    height: 100px;
    margin-top: -50px;
    border: 4px solid var(--pico-background-color);
  }
}
</style>