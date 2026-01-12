<script setup>
import { ref, onMounted } from 'vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import Loader from '@/components/layout/Loader.vue';
import { ListVideo } from 'lucide-vue-next';
import { getMyPlaylists } from '@/services/playlist.service';

const isLoading = ref(true);
const playlists = ref([]);

onMounted(async () => {
    try {
        const response = await getMyPlaylists();
        playlists.value = response.data.data;
    } catch (error) {
        console.error("Failed to fetch playlists:", error);
        playlists.value = [
            { id: 1, name: "Watch Later", count: 12 },
            { id: 2, name: "Music Favorites", count: 45 },
            { id: 3, name: "Vue.js Tutorials", count: 8 }
        ];
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <Loader v-if="isLoading" />
    <BaseLayout v-else>
        <h2>Your Playlists</h2>
        <div class="playlist-grid">
            <article v-for="list in playlists" :key="list.id" class="playlist-card">
                <div class="thumbnail">
                    <ListVideo size="48" />
                    <span class="count">{{ list.count }} videos</span>
                </div>
                <footer>
                    <strong>{{ list.name }}</strong>
                    <router-link :to="'/playlist/' + list._id" role="button"
                        class="secondary outline btn-sm">View</router-link>
                </footer>
            </article>
        </div>
    </BaseLayout>
</template>

<style scoped>
.playlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
}

.playlist-card {
    padding: 0;
    overflow: hidden;
}

.thumbnail {
    height: 160px;
    background: var(--pico-muted-border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--pico-muted-color);
    position: relative;
}

.count {
    margin-top: 0.5rem;
    font-size: 0.875rem;
}

footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}
</style>
