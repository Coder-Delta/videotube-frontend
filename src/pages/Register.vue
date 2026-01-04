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

    <div v-else class="page">
        <Navbar />

        <main class="register-container">
            <form class="register-card" @submit.prevent="handleRegister">
                <div class="icon-header">
                    <div class="icon-box">
                        <UserPlus :size="24" />
                    </div>
                </div>
                
                <h2>Welcome</h2>
                <p class="subtitle">Create your Videotube account</p>

                <p v-if="error" class="error-msg">{{ error }}</p>

                <div class="field">
                    <label>Full Name</label>
                    <div class="input-wrapper">
                        <User class="input-icon" :size="18" />
                        <input type="text" placeholder="John Doe" v-model="name" />
                    </div>
                </div>

                <div class="field">
                    <label>Email Address</label>
                    <div class="input-wrapper">
                        <Mail class="input-icon" :size="18" />
                        <input type="email" placeholder="name@example.com" v-model="email" />
                    </div>
                </div>

                <div class="field">
                    <label>Password</label>
                    <div class="input-wrapper">
                        <Lock class="input-icon" :size="18" />
                        <input type="password" placeholder="••••••••" v-model="password" />
                    </div>
                </div>

                <div class="field">
                    <label>Confirm Password</label>
                    <div class="input-wrapper">
                        <Lock class="input-icon" :size="18" />
                        <input type="password" placeholder="••••••••" v-model="confirmPassword" />
                    </div>
                </div>

                <button type="submit" class="register-btn">
                    <span>Create Account</span>
                    <UserPlus :size="18" />
                </button>

                <p class="redirect">
                    Don't have an account? <a href="#">Create one</a>
                </p>
            </form>
        </main>

        <Footer />
    </div>
</template>

<style scoped>
.page {
    min-height: 100vh;
    background: #020617; /* Deep dark background */
    color: #ffffff;
    display: flex;
    flex-direction: column;
    font-family: 'Inter', system-ui, sans-serif;
}

.register-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
}

/* Updated Card Design */
.register-card {
    width: 100%;
    max-width: 440px;
    background: #0f172a;
    padding: 40px;
    border-radius: 24px; /* Matches the rounded look in image */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Icon Header */
.icon-header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.icon-box {
    background: rgba(37, 99, 235, 0.1);
    color: #3b82f6;
    padding: 12px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.register-card h2 {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
}

.subtitle {
    text-align: center;
    color: #94a3b8;
    font-size: 15px;
    margin-bottom: 32px;
}

/* Inputs with Icons */
.field {
    margin-bottom: 20px;
}

.field label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #e2e8f0;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 14px;
    color: #64748b;
}

.input-wrapper input {
    width: 100%;
    padding: 12px 12px 12px 42px;
    border-radius: 10px;
    border: 1px solid #1e293b;
    background: #020617;
    color: #ffffff;
    font-size: 15px;
    transition: all 0.2s ease;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Gradient Button */
.register-btn {
    width: 100%;
    margin-top: 10px;
    padding: 14px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: opacity 0.2s;
}

.register-btn:hover {
    opacity: 0.9;
}

/* Footer of Card */
.redirect {
    margin-top: 24px;
    font-size: 14px;
    text-align: center;
    color: #94a3b8;
}

.redirect a {
    color: #3b82f6;
    font-weight: 600;
    text-decoration: none;
}

.error-msg {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 20px;
    text-align: center;
}
</style>