<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import { User, LogOut, Edit3, Save, Moon, Sun, Monitor } from 'lucide-vue-next';

const router = useRouter();
const currentUser = ref(null);
const isEditing = ref(false);
const currentTheme = ref('auto');

const editForm = reactive({ name: '', bio: '' });

onMounted(() => {
    // Load User
    const user = localStorage.getItem('user');
    if (user) {
        currentUser.value = JSON.parse(user);
        editForm.name = currentUser.value.fullName || currentUser.value.name; // Handle potentially different naming
        editForm.bio = currentUser.value.bio || 'Digital Creator';
    }

    // Load Theme
    const savedTheme = localStorage.getItem('pico_theme') || 'auto';
    setTheme(savedTheme);
});

const formatDate = (dateString) => {
    if (!dateString) return 'Member since forever';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const setTheme = (theme) => {
    currentTheme.value = theme;
    localStorage.setItem('pico_theme', theme);
    const html = document.querySelector('html');

    if (theme === 'auto') {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', theme);
    }
};

const toggleEdit = () => {
    if (!isEditing.value) {
        editForm.name = currentUser.value.fullName || currentUser.value.name;
        editForm.bio = currentUser.value.bio || 'Digital Creator';
    }
    isEditing.value = !isEditing.value;
};

const saveProfile = () => {
    if (currentUser.value) {
        currentUser.value.fullName = editForm.name; // Standardize on fullName
        currentUser.value.name = editForm.name; // Keep name for compat
        currentUser.value.bio = editForm.bio;

        localStorage.setItem('user', JSON.stringify(currentUser.value));
        isEditing.value = false;
        // Trigger generic storage event if other tabs need update
        window.dispatchEvent(new Event('storage'));
    }
};

const goToChannel = () => {
    if (!currentUser.value) return;
    const username = currentUser.value.username || 'user';
    router.push(`/channel/${username}`);
};

const logout = () => {
    localStorage.removeItem('user');
    currentUser.value = null;
    router.push('/login');
};
</script>

<template>
    <BaseLayout>
        <div class="container profile-container">
            <div v-if="currentUser" class="profile-card">

                <!-- Avatar Section -->
                <div class="profile-header">
                    <div class="avatar-wrapper">
                        <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Avatar" />
                        <div v-else class="avatar-placeholder">{{ (currentUser.name || 'U').charAt(0) }}</div>
                    </div>
                </div>

                <!-- Info Section -->
                <div class="profile-body">
                    <div v-if="!isEditing" class="info-view">
                        <h1>{{ currentUser.fullName || currentUser.name }}</h1>
                        <p class="username">@{{ currentUser.username }}</p>
                        <p class="bio">{{ currentUser.bio || 'Digital Creator' }}</p>
                        <small class="joined-date">{{ formatDate(currentUser.createdAt) }}</small>
                    </div>

                    <div v-else class="info-edit">
                        <label>Full Name
                            <input v-model="editForm.name" type="text" />
                        </label>
                        <label>Bio
                            <input v-model="editForm.bio" type="text" />
                        </label>
                    </div>
                </div>

                <!-- Actions -->
                <div class="profile-actions">
                    <button v-if="!isEditing" @click="toggleEdit" class="secondary outline btn-sm">
                        <Edit3 size="16" /> Edit Profile
                    </button>
                    <div v-else class="edit-buttons">
                        <button @click="saveProfile" class="btn-sm">Save</button>
                        <button @click="toggleEdit" class="secondary outline btn-sm">Cancel</button>
                    </div>

                    <button @click="goToChannel" class="outline btn-sm">View Channel</button>
                </div>

                <hr />

                <!-- Theme Switcher -->
                <div class="theme-section">
                    <h4>Appearance</h4>
                    <div class="theme-toggles">
                        <button @click="setTheme('light')" :class="{ outline: currentTheme !== 'light' }"
                            aria-label="Light Mode">
                            <Sun size="18" />
                        </button>
                        <button @click="setTheme('dark')" :class="{ outline: currentTheme !== 'dark' }"
                            aria-label="Dark Mode">
                            <Moon size="18" />
                        </button>
                        <button @click="setTheme('auto')" :class="{ outline: currentTheme !== 'auto' }"
                            aria-label="Auto System">
                            <Monitor size="18" />
                        </button>
                    </div>
                </div>

                <div class="footer-actions">
                    <button @click="logout" class="contrast outline btn-sm">
                        <LogOut size="16" /> Sign Out
                    </button>
                </div>

            </div>

            <!-- Login Prompt -->
            <div v-else class="login-prompt">
                <article>
                    <h3>Join the Community</h3>
                    <p>Sign in to manage your profile and preferences.</p>
                    <router-link to="/login" role="button">Sign In</router-link>
                </article>
            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>
.profile-container {
    max-width: 600px;
    padding: 3rem 1rem;
    min-height: 80vh;
}

.profile-card {
    background: var(--pico-card-background-color);
    padding: 2.5rem;
    border-radius: 20px;
    border: 1px solid var(--pico-muted-border-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    /* Subtle shadow */
    text-align: center;
}

/* Avatar */
.avatar-wrapper {
    width: 120px;
    height: 120px;
    margin: 0 auto 1.5rem;
    border-radius: 50%;
    overflow: hidden;
    background: var(--pico-secondary-background);
    border: 4px solid var(--pico-background-color);
    box-shadow: 0 0 0 1px var(--pico-muted-border-color);
}

.avatar-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: bold;
    color: var(--pico-muted-color);
}

/* Typography */
.info-view h1 {
    margin-bottom: 0.25rem;
    font-size: 1.75rem;
}

.username {
    color: var(--pico-primary);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.bio {
    color: var(--pico-muted-color);
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.joined-date {
    color: var(--pico-muted-color);
    font-size: 0.8rem;
    display: block;
    margin-bottom: 1.5rem;
}

/* Edit State */
.info-edit {
    text-align: left;
    margin-bottom: 1.5rem;
}

/* Buttons */
.profile-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.edit-buttons {
    display: flex;
    gap: 0.5rem;
}

.btn-sm {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    border-radius: 99px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Theme Section */
.theme-section {
    margin: 2rem 0;
}

.theme-section h4 {
    font-size: 0.9rem;
    color: var(--pico-muted-color);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1rem;
}

.theme-toggles {
    display: inline-flex;
    background: var(--pico-card-sectionning-background-color);
    /* Pico doesn't standardly have this var, using fallback or muted background */
    background: var(--pico-code-background-color);
    padding: 0.25rem;
    border-radius: 99px;
    gap: 0.25rem;
}

.theme-toggles button {
    border: none;
    margin: 0;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    background: transparent;
    color: var(--pico-muted-color);
}

.theme-toggles button:not(.outline) {
    background: var(--pico-card-background-color);
    color: var(--pico-color);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Footer */
.footer-actions {
    margin-top: 2rem;
}

/* Responsive */
@media (max-width: 576px) {
    .profile-card {
        padding: 1.5rem;
    }

    .avatar-wrapper {
        width: 100px;
        height: 100px;
    }
}
</style>
