<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import authService from '@/services/auth.service.js';
import { clearAuthData, removeCookie } from '@/utils/cookie';
import { Trash2, AlertTriangle, Key, Shield } from 'lucide-vue-next';
import { showToast } from '@/utils/toast';

const router = useRouter();
const showConfirmation = ref(false);

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const passwordSuccess = ref('');
const isUpdating = ref(false);

const deleteAccount = async () => {
    try {
        await authService.deleteAccount();

        // Clear local storage / cookies
        clearAuthData();
        removeCookie('pico_theme');

        // Redirect to home and reload
        window.location.href = '/';
    } catch (error) {
        console.error("Failed to delete account:", error);
        showToast("Failed to delete account. Please try again.", 'error');
    }
};

const changePassword = async () => {
    passwordError.value = '';
    passwordSuccess.value = '';

    if (newPassword.value !== confirmPassword.value) {
        passwordError.value = "New passwords do not match.";
        return;
    }

    if (newPassword.value.length < 6) {
        passwordError.value = "Password must be at least 6 characters.";
        return;
    }

    isUpdating.value = true;
    try {
        await authService.resetPassword({
            oldPassword: oldPassword.value,
            newPassword: newPassword.value
        });
        passwordSuccess.value = "Password updated successfully.";
        oldPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
    } catch (err) {
        passwordError.value = err.message || "Failed to update password.";
    } finally {
        isUpdating.value = false;
    }
};
</script>

<template>
    <BaseLayout>
        <div class="container settings-container">
            <div class="settings-card">
                <h1>Settings</h1>
                <p class="text-muted">Manage your account preferences and data.</p>

                <hr />

                <!-- Change Password Section -->
                <div class="section">
                    <h3>
                        <Key size="20" /> Change Password
                    </h3>
                    <p class="small-text">Update your password to keep your account secure.</p>

                    <form @submit.prevent="changePassword" class="password-form">
                        <label>
                            Current Password
                            <input type="password" v-model="oldPassword" required />
                        </label>
                        <label>
                            New Password
                            <input type="password" v-model="newPassword" required />
                        </label>
                        <label>
                            Confirm New Password
                            <input type="password" v-model="confirmPassword" required />
                        </label>

                        <div v-if="passwordError" class="alert error">{{ passwordError }}</div>
                        <div v-if="passwordSuccess" class="alert success">{{ passwordSuccess }}</div>

                        <button type="submit" :disabled="isUpdating" class="secondary outline btn-sm">
                            {{ isUpdating ? 'Updating...' : 'Update Password' }}
                        </button>
                    </form>
                </div>

                <hr />

                <!-- Danger Zone -->
                <div class="danger-zone">
                    <h3>Delete Account</h3>
                    <p>Permanently remove your account and all of your content.</p>

                    <div v-if="!showConfirmation">
                        <button class="delete-btn" @click="showConfirmation = true">
                            <Trash2 size="18" /> Delete Account
                        </button>
                    </div>

                    <div v-else class="confirmation-box">
                        <div class="warning-icon">
                            <AlertTriangle size="24" />
                        </div>
                        <p><strong>Are you sure?</strong> This action cannot be undone.</p>
                        <div class="confirm-actions">
                            <button class="delete-btn-confirm" @click="deleteAccount">Yes, Delete My Account</button>
                            <button class="cancel-btn" @click="showConfirmation = false">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>
.settings-container {
    max-width: 600px;
    padding: 3rem 1rem;
    min-height: 80vh;
}

.settings-card {
    background: var(--pico-card-background-color);
    padding: 2.5rem;
    border-radius: 20px;
    border: 1px solid var(--pico-muted-border-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
}

h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.text-muted {
    color: var(--pico-muted-color);
    margin-bottom: 1.5rem;
}

.small-text {
    font-size: 0.9rem;
    color: var(--pico-muted-color);
    margin-bottom: 1.5rem;
}

.section {
    padding: 1rem 0;
}

.password-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
}

.alert {
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.error {
    background: rgba(220, 53, 69, 0.1);
    color: var(--pico-del-color);
    border: 1px solid rgba(220, 53, 69, 0.2);
}

.success {
    background: rgba(40, 167, 69, 0.1);
    color: var(--pico-ins-color);
    border: 1px solid rgba(40, 167, 69, 0.2);
}



.danger-zone {
    padding: 1.5rem;
    border: 1px solid rgba(220, 53, 69, 0.3);
    border-radius: 12px;
    background: rgba(220, 53, 69, 0.05);
    margin-top: 2rem;
}

.danger-zone h3 {
    color: var(--pico-del-color);
}

.delete-btn {
    background: var(--pico-del-color);
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.5rem;
    margin-top: 1rem;
    color: white;
}

.delete-btn:hover {
    background: #c82333;
    /* Darker red */
}

.confirmation-box {
    margin-top: 1rem;
    text-align: center;
    background: var(--pico-background-color);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--pico-muted-border-color);
}

.warning-icon {
    color: #ffc107;
    margin-bottom: 0.5rem;
}

.confirm-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
}

.delete-btn-confirm {
    background: var(--pico-del-color);
    border: none;
    color: white;
}

.cancel-btn {
    background: transparent;
    border: 1px solid var(--pico-muted-border-color);
    color: var(--pico-color);
}
</style>
