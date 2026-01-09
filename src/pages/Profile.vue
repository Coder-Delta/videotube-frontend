<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import { User, Mail, Calendar, Edit3, Settings, Shield, Video, BarChart2, Save, X, LogOut, Upload } from 'lucide-vue-next';

const router = useRouter();
const currentUser = ref(null);
const isEditing = ref(false);
const showSettingsModal = ref(false);

const editForm = reactive({
    name: '',
    email: '',
    bio: 'Content Creator'
});

onMounted(() => {
    const user = localStorage.getItem('user');
    if (user) {
        currentUser.value = JSON.parse(user);
        // Initialize form with defaults or existing values
        editForm.name = currentUser.value.name || '';
        editForm.email = currentUser.value.email || '';
        editForm.bio = currentUser.value.bio || 'Content Creator';
    }
});

const toggleEdit = () => {
    if (isEditing.value) {
        // Cancel edit
        isEditing.value = false;
    } else {
        // Start edit
        // Reset form to current values
        editForm.name = currentUser.value.name;
        editForm.email = currentUser.value.email;
        editForm.bio = currentUser.value.bio || 'Content Creator';
        isEditing.value = true;
    }
};

const saveProfile = () => {
    if (currentUser.value) {
        currentUser.value.name = editForm.name;
        currentUser.value.email = editForm.email;
        currentUser.value.bio = editForm.bio;

        localStorage.setItem('user', JSON.stringify(currentUser.value));
        isEditing.value = false;
    }
};

const openSettings = () => {
    showSettingsModal.value = true;
};

const closeSettings = () => {
    showSettingsModal.value = false;
};

const goToChannel = () => {
    const username = currentUser.value?.name?.replace(/\s+/g, '').toLowerCase() || 'user';
    router.push({ name: 'Channel', params: { username } });
};

const handleLogout = () => {
    localStorage.removeItem('user');
    currentUser.value = null;
    router.push('/login');
};
</script>

<template>
    <BaseLayout>
        <div class="container profile-page" v-if="currentUser">
            <div class="grid profile-grid">
                <!-- Left Column: User Card -->
                <aside>
                    <article class="profile-card">
                        <div class="card-header centered">
                            <div class="avatar-large">
                                <User v-if="!currentUser.avatar" size="64" />
                                <img v-else :src="currentUser.avatar" alt="Avatar" />
                            </div>
                            <h2 v-if="!isEditing">{{ currentUser.name }}</h2>
                            <input v-else v-model="editForm.name" type="text" placeholder="Name" aria-label="Name" />

                            <p class="subtitle" v-if="!isEditing">{{ currentUser.bio || 'Content Creator' }}</p>
                            <input v-else v-model="editForm.bio" type="text" placeholder="Bio" aria-label="Bio" />
                        </div>

                        <div class="card-body">
                            <ul class="details-list">
                                <li>
                                    <Mail size="18" />
                                    <span v-if="!isEditing">{{ currentUser.email }}</span>
                                    <input v-else v-model="editForm.email" type="email" placeholder="Email"
                                        aria-label="Email" />
                                </li>
                                <li>
                                    <Calendar size="18" />
                                    <span>Joined Jan 2024</span>
                                </li>
                                <li>
                                    <Shield size="18" />
                                    <span>Verified Account</span>
                                </li>
                            </ul>
                        </div>

                        <div class="card-footer centered">
                            <div v-if="!isEditing" class="action-buttons-vertical">
                                <button @click="toggleEdit" class="secondary outline">
                                    <Edit3 size="18" /> Edit Profile
                                </button>
                                <button @click="openSettings" class="contrast outline">
                                    <Settings size="18" /> Settings
                                </button>
                                <button @click="handleLogout" class="outline"
                                    style="--pico-color: var(--pico-del-color); border-color: var(--pico-del-color); color: var(--pico-del-color);">
                                    <LogOut size="18" /> Sign Out
                                </button>
                            </div>
                            <div v-else class="edit-actions">
                                <button @click="saveProfile" class="primary">
                                    <Save size="18" /> Save
                                </button>
                                <button @click="toggleEdit" class="secondary outline">
                                    <X size="18" /> Cancel
                                </button>
                            </div>
                        </div>
                    </article>
                </aside>

                <!-- Right Column: Stats & Content -->
                <section class="main-content">
                    <!-- Stats Row -->
                    <div class="grid stats-grid">
                        <article class="stat-card">
                            <div class="stat-icon">
                                <User size="24" />
                            </div>
                            <div class="stat-value">1.2K</div>
                            <div class="stat-label">Subscribers</div>
                        </article>
                        <article class="stat-card">
                            <div class="stat-icon"><Video size="24" /></div>
                            <div class="stat-value">45</div>
                            <div class="stat-label">Videos</div>
                        </article>
                        <article class="stat-card">
                            <div class="stat-icon">
                                <BarChart2 size="24" />
                            </div>
                            <div class="stat-value">150K</div>
                            <div class="stat-label">Views</div>
                        </article>
                    </div>

                    <!-- Quick Actions -->
                    <article class="quick-actions">
                        <header><strong>Quick Actions</strong></header>
                        <div class="grid">
                            <button @click="goToChannel" class="secondary">
                                <Video size="18" /> My Channel
                            </button>
                            <router-link to="/upload" role="button" class="primary">
                                <Upload size="18" /> Upload Video
                            </router-link>
                        </div>
                    </article>

                    <!-- Recent Activity -->
                    <article class="activity-feed">
                        <header><strong>Recent Uploads</strong></header>
                        <div class="empty-state">
                            <p>No recent uploads to show.</p>
                            <small>Start sharing your content with the world!</small>
                        </div>
                    </article>
                </section>
            </div>
        </div>

        <div v-else class="login-prompt container">
            <article class="centered-card">
                <h3>Please Sign In</h3>
                <p>You need to be logged in to view your profile.</p>
                <router-link to="/login" role="button">Sign In</router-link>
            </article>
        </div>

        <!-- Settings Modal -->
        <dialog :open="showSettingsModal">
            <article>
                <header>
                    <button aria-label="Close" rel="prev" @click="closeSettings"></button>
                    <h3>Account Settings</h3>
                </header>
                <p>
                    Manage your account preferences, privacy, and notifications here.
                </p>
                <br>
                <fieldset>
                    <label>
                        <input type="checkbox" checked />
                        Email Notifications
                    </label>
                    <label>
                        <input type="checkbox" />
                        Private Profile
                    </label>
                </fieldset>
                <footer>
                    <button class="secondary" @click="closeSettings">Close</button>
                    <button @click="closeSettings">Save Changes</button>
                </footer>
            </article>
        </dialog>
    </BaseLayout>
</template>

<style scoped>
.profile-page {
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.profile-grid {
    grid-template-columns: 1fr 2fr;
    align-items: start;
    gap: 2rem;
}

@media (max-width: 992px) {
    .profile-grid {
        grid-template-columns: 1fr;
    }
}

/* Profile Card */
.profile-card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.centered {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.avatar-large {
    width: 120px;
    height: 120px;
    background: var(--pico-secondary-background);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--pico-primary);
    border: 4px solid var(--pico-card-background-color);
    box-shadow: 0 0 0 2px var(--pico-muted-border-color);
    margin-bottom: 1rem;
    overflow: hidden;
}

.avatar-large img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.subtitle {
    color: var(--pico-muted-color);
}

.details-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.details-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    background: var(--pico-background-color);
    padding: 0.75rem;
    border-radius: var(--pico-border-radius);
    width: 100%;
}

.action-buttons-vertical {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
}

.edit-actions {
    display: flex;
    gap: 0.5rem;
    width: 100%;
}

.edit-actions button {
    flex: 1;
}

/* Stats */
.stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
}

@media (max-width: 576px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
}

.stat-card {
    text-align: center;
    padding: 1.5rem;
    margin-bottom: 0;
}

.stat-icon {
    color: var(--pico-primary);
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.2;
}

.stat-label {
    color: var(--pico-muted-color);
    font-size: 0.9rem;
}

/* Activity */
.empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--pico-muted-color);
}

/* Login Prompt */
.login-prompt {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
}

.centered-card {
    text-align: center;
    max-width: 400px;
    width: 100%;
}

button svg {
    margin-right: 0.25rem;
}
</style>
