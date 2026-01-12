<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import { User, LogOut, Edit3, Save, Moon, Sun, Monitor, Camera, Image as ImageIcon } from 'lucide-vue-next';
import authService from '@/services/auth.service';

import { getAuthData, setAuthData, clearAuthData } from "@/utils/cookie";

const router = useRouter();
const currentUser = ref(null);
const isEditing = ref(false);
const currentTheme = ref('auto');

const editForm = reactive({ name: '', email: '' });

onMounted(() => {
    // Load User
    const { user } = getAuthData();
    if (user) {
        currentUser.value = user;
        editForm.name = currentUser.value.fullName || currentUser.value.name;
        editForm.email = currentUser.value.email || '';
        // Ensure coverImage exists in ref if not in storage, for UI consistency
        if (!currentUser.value.coverImage) currentUser.value.coverImage = '';
    }

    // Load Theme
    const savedTheme = localStorage.getItem('pico_theme') || 'auto';
    setTheme(savedTheme);
});

// File Refs
const avatarInput = ref(null);
const coverInput = ref(null);
const tempAvatar = ref(null);
const tempCover = ref(null);
const selectedAvatarFile = ref(null);
const selectedCoverFile = ref(null);

const triggerAvatarUpload = () => avatarInput.value.click();
const triggerCoverUpload = () => coverInput.value.click();

const onAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedAvatarFile.value = file;
        tempAvatar.value = URL.createObjectURL(file);
    }
};

const onCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedCoverFile.value = file;
        tempCover.value = URL.createObjectURL(file);
    }
};

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
        editForm.email = currentUser.value.email;
    }
    isEditing.value = !isEditing.value;
};

const saveProfile = async () => {
    // ... (validation logic stays same) ...
    console.group("🧩 saveProfile START");

    try {
        if (!currentUser?.value) {
            console.error("❌ currentUser missing");
            return;
        }

        // 🔐 Required fields
        if (!editForm.name?.trim() || !editForm.email?.trim()) {
            alert("Name and email are required");
            return;
        }

        // 🔍 Check changes
        const isTextChanged =
            editForm.name !== currentUser.value.fullName ||
            editForm.email !== currentUser.value.email;

        const hasAvatar = !!selectedAvatarFile?.value;
        const hasCover = !!selectedCoverFile?.value;

        if (!isTextChanged && !hasAvatar && !hasCover) {
            console.log("⚠️ Nothing changed");
            return;
        }

        // 📦 Build FormData
        const formData = new FormData();

        if (isTextChanged) {
            formData.append("fullName", editForm.name);
            formData.append("email", editForm.email);
        }

        // 🖼 Avatar validation
        if (hasAvatar) {
            const file = selectedAvatarFile.value;

            if (!file.type.startsWith("image/")) {
                throw new Error("Avatar must be an image");
            }

            if (file.size > 2 * 1024 * 1024) {
                throw new Error("Avatar exceeds 2MB");
            }

            formData.append("avatar", file);
        }

        // 🖼 Cover validation
        if (hasCover) {
            const file = selectedCoverFile.value;

            if (!file.type.startsWith("image/")) {
                throw new Error("Cover must be an image");
            }

            if (file.size > 5 * 1024 * 1024) {
                throw new Error("Cover exceeds 5MB");
            }

            formData.append("coverImage", file);
        }

        console.log("📡 Sending merged update request...");

        const response = await authService.updateUserProfile(formData);

        // ✅ Backend response shape
        if (!response?.data) {
            throw new Error("Invalid server response");
        }

        const updatedUser = response.data;

        // 🔄 Sync state
        currentUser.value = {
            ...currentUser.value,
            ...updatedUser,
        };

        // 💾 Persist
        const { token } = getAuthData();
        setAuthData(token, currentUser.value);

        // 🧹 Cleanup
        isEditing.value = false;
        tempAvatar.value = null;
        tempCover.value = null;
        selectedAvatarFile.value = null;
        selectedCoverFile.value = null;

        window.dispatchEvent(new Event("storage"));

        console.log("✅ Profile updated successfully");

    } catch (error) {
        console.group("🔥 saveProfile ERROR");
        console.error(error);
        console.groupEnd();

        alert(error.message || "Profile update failed");
    } finally {
        console.groupEnd();
        console.log("🏁 saveProfile END");
    }
};

const goToChannel = () => {
    if (!currentUser.value) return;
    const username = currentUser.value.username || 'user';
    router.push(`/channel/${username}`);
};

const logout = () => {
    clearAuthData();
    currentUser.value = null;
    router.push('/login');
};
</script>

<template>
    <BaseLayout>
        <div class="container profile-container">
            <div v-if="currentUser" class="profile-card">

                <!-- Cover Image -->
                <div class="profile-cover">
                    <!-- Display temp cover if selected, else current -->
                    <img v-if="tempCover" :src="tempCover" alt="Cover Preview" />
                    <img v-else-if="currentUser.coverImage" :src="currentUser.coverImage" alt="Cover" />
                    <div v-else class="cover-placeholder"></div>

                    <div v-if="isEditing" class="cover-edit-overlay">
                        <button @click="triggerCoverUpload" class="secondary outline btn-sm cover-btn">
                            <ImageIcon size="16" /> Change Cover
                        </button>
                    </div>
                </div>

                <div class="profile-content">
                    <!-- Avatar Section -->
                    <div class="profile-header">
                        <div class="avatar-wrapper">
                            <img v-if="tempAvatar" :src="tempAvatar" alt="Avatar Preview" />
                            <img v-else-if="currentUser.avatar" :src="currentUser.avatar" alt="Avatar" />
                            <div v-else class="avatar-placeholder">{{ (currentUser.name || 'U').charAt(0) }}</div>

                            <div v-if="isEditing" class="avatar-edit-overlay" @click="triggerAvatarUpload">
                                <Camera size="24" />
                            </div>
                        </div>
                        <div v-if="isEditing" class="avatar-c-btn">
                            <button @click="triggerAvatarUpload" class="secondary outline btn-sm">
                                <Camera size="16" /> Change Avatar
                            </button>
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
                            <label>Email
                                <input v-model="editForm.email" type="email" />
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

                    <!-- Hidden Inputs -->
                    <input type="file" ref="avatarInput" accept="image/*" style="display:none"
                        @change="onAvatarChange" />
                    <input type="file" ref="coverInput" accept="image/*" style="display:none" @change="onCoverChange" />

                    <div class="footer-actions">
                        <button @click="logout" class="contrast outline btn-sm">
                            <LogOut size="16" /> Sign Out
                        </button>
                    </div>

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
    padding: 0;
    /* Remove default padding to let cover be full width */
    border-radius: 20px;
    border: 1px solid var(--pico-muted-border-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    text-align: center;
    overflow: hidden;
    /* For cover image corners */
}

.profile-content {
    padding: 0 2.5rem 2.5rem;
    /* Add padding here instead */
    position: relative;
    margin-top: -60px;
    /* Pull content up to overlap cover */
}

/* Cover Image */
.profile-cover {
    width: 100%;
    height: 150px;
    background: var(--pico-muted-border-color);
    position: relative;
}

.profile-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cover-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--pico-primary) 0%, var(--pico-secondary-background) 100%);
    opacity: 0.3;
}

/* Avatar */
.avatar-wrapper {
    width: 120px;
    height: 120px;
    margin: 0 auto 0.5rem;
    /* Reduced bottom margin */
    border-radius: 50%;
    overflow: hidden;
    background: var(--pico-secondary-background);
    border: 4px solid var(--pico-card-background-color);
    /* Match card bg */
    box-shadow: 0 0 0 1px var(--pico-muted-border-color);
    position: relative;
}

.avatar-edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
}

.avatar-wrapper:hover .avatar-edit-overlay {
    opacity: 1;
}

.avatar-c-btn {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.cover-edit-overlay {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 10;
}

.cover-btn {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.cover-btn:hover {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-color: white;
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
