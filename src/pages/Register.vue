<script setup>
import { ref } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";

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

    // Simulate API call
    setTimeout(() => {
        isLoading.value = false;

        console.log("Register data:", {
            name: name.value,
            email: email.value,
            password: password.value,
        });
    }, 1500);
};
</script>

<template>
    <Loader v-if="isLoading" />

    <div v-else class="page">
        <Navbar />

        <main class="register-container">
            <form class="register-card" @submit.prevent="handleRegister">
                <h2>Create your Videotube account</h2>

                <p v-if="error" class="error">{{ error }}</p>

                <div class="field">
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" v-model="name" />
                </div>

                <div class="field">
                    <label>Email</label>
                    <input type="email" placeholder="you@example.com" v-model="email" />
                </div>

                <div class="field">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" v-model="password" />
                </div>

                <div class="field">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="••••••••" v-model="confirmPassword" />
                </div>

                <button type="submit" class="register-btn">
                    Create Account
                </button>

                <p class="redirect">
                    Already have an account?
                    <a href="#">Login</a>
                </p>
            </form>
        </main>

        <Footer />
    </div>
</template>

<style scoped>
/* Page wrapper */
.page {
    min-height: 100vh;
    background: #020617;
    color: #e5e7eb;
    display: flex;
    flex-direction: column;
}

/* Center container */
.register-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

/* Card */
.register-card {
    width: 100%;
    max-width: 380px;
    background: #0f172a;
    padding: 28px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

/* Title */
.register-card h2 {
    text-align: center;
    margin-bottom: 18px;
}

/* Error */
.error {
    background: #7f1d1d;
    color: #fecaca;
    padding: 8px;
    border-radius: 4px;
    font-size: 13px;
    margin-bottom: 12px;
    text-align: center;
}

/* Input fields */
.field {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
}

.field label {
    font-size: 13px;
    margin-bottom: 4px;
    color: #cbd5f5;
}

.field input {
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid #334155;
    background: #020617;
    color: #ffffff;
    outline: none;
}

.field input::placeholder {
    color: #64748b;
}

.field input:focus {
    border-color: #2563eb;
}

/* Button */
.register-btn {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    border: none;
    background: #2563eb;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
}

.register-btn:hover {
    background: #1d4ed8;
}

/* Redirect */
.redirect {
    margin-top: 14px;
    font-size: 13px;
    text-align: center;
}

.redirect a {
    color: #60a5fa;
    text-decoration: none;
}

.redirect a:hover {
    text-decoration: underline;
}
</style>
