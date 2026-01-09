<script setup>
import { ref } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";
// Note: You might need to install lucide-vue-next for the icons
import { User, Mail, Lock, UserPlus } from 'lucide-vue-next';

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isLoading = ref(false);
const error = ref("");

const handleRegister = () => {
    error.value = "";
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = "All fields are required";
        return;
    }
    if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match";
        return;
    }
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        console.log("Register data:", { name: name.value, email: email.value });
    }, 1500);
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
                        Email Address
                        <input type="email" placeholder="name@example.com" v-model="email" required />
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
    max-width: 600px;
    margin-top: 2rem;
    margin-bottom: 2rem;
}
</style>