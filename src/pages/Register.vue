<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/layout/Loader.vue";
// Note: You might need to install lucide-vue-next for the icons
import { User, Mail, Lock, UserPlus } from 'lucide-vue-next';
import authService from "@/services/auth.service.js";

const router = useRouter();

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const avatar = ref(null);
const coverImage = ref(null);

const isLoading = ref(false);
const error = ref("");

const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) avatar.value = file;
};

const onCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) coverImage.value = file;
};

const handleRegister = async () => {
    error.value = "";
    if (!name.value || !username.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = "All fields are required";
        return;
    }
    if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match";
        return;
    }

    isLoading.value = true;
    try {
        const formData = new FormData();
        formData.append("fullName", name.value);
        formData.append("username", username.value);
        formData.append("email", email.value);
        formData.append("password", password.value);

        if (avatar.value) formData.append("avatar", avatar.value);
        if (coverImage.value) formData.append("coverImage", coverImage.value);

        await authService.registerUser(formData);
        // On success, redirect to login page
        router.push("/login"); // Or maybe auto-login if the API supports receiving a token on register
    } catch (err) {
        console.error(err);
        error.value = err.message || "Registration failed. Please try again.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <Loader v-if="isLoading" />

    <div v-else>
        <Navbar />
        <main class="container">
            <article>
                <header>
                    <h1>Create Account</h1>
                </header>

                <div v-if="error">
                    <p style="color:red">{{ error }}</p>
                </div>

                <form @submit.prevent="handleRegister">
                    <label>
                        Full Name
                        <input type="text" placeholder="John Doe" v-model="name" required />
                    </label>

                    <label>
                        Username
                        <input type="text" placeholder="johndoe123" v-model="username" required />
                    </label>

                    <label>
                        Email Address
                        <input type="email" placeholder="name@example.com" v-model="email" required />
                    </label>

                    <label class="file-label">
                        Avatar
                        <input type="file" @change="onAvatarChange" accept="image/*" />
                    </label>

                    <label class="file-label">
                        Cover Image (Optional)
                        <input type="file" @change="onCoverImageChange" accept="image/*" />
                    </label>

                    <label>
                        Password
                        <input type="password" placeholder="••••••••" v-model="password" required />
                    </label>

                    <label>
                        Confirm Password
                        <input type="password" placeholder="••••••••" v-model="confirmPassword" required />
                    </label>

                    <button type="submit">Sign Up</button>
                </form>

                <footer>
                    <small>
                        Already have an account?
                        <router-link to="/login">Sign In</router-link>
                    </small>
                </footer>
            </article>
        </main>
        <Footer />
    </div>
</template>

<style scoped>
main {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 140px);
    padding: 2rem 1rem;
}

article {
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--pico-muted-border-color);
    background: var(--pico-card-background-color);
}
</style>