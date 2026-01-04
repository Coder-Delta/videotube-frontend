<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-vue-next";

import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/common/Loader.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const handleLogin = () => {
  error.value = "";
  if (!email.value || !password.value) {
    error.value = "Please enter both email and password";
    return;
  }

  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    router.push("/");
  }, 1500);
};
</script>

<template>
  <Loader v-if="isLoading" />

  <div v-else class="auth-page">
    <Navbar />

    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <main class="auth-viewport">
      <form class="glass-card" @submit.prevent="handleLogin">
        <header class="auth-header">
          <div class="auth-icon-wrap">
            <LogIn :size="28" class="accent-text" />
          </div>
          <h1>Welcome Back</h1>
          <p>Login to your Videotube account</p>
        </header>

        <Transition name="shake">
          <div v-if="error" class="error-toast">
            <AlertCircle :size="18" />
            <span>{{ error }}</span>
          </div>
        </Transition>

        <div class="input-group">
          <label>Email Address</label>
          <div class="input-wrapper">
            <Mail :size="18" class="field-icon" />
            <input
              type="email"
              placeholder="name@example.com"
              v-model="email"
              class="styled-input"
            />
          </div>
        </div>

        <div class="input-group">
          <div class="label-row">
            <label>Password</label>
            <router-link to="/forgot" class="forgot-link">Forgot?</router-link>
          </div>
          <div class="input-wrapper">
            <Lock :size="18" class="field-icon" />
            <input
              type="password"
              placeholder="••••••••"
              v-model="password"
              class="styled-input"
            />
          </div>
        </div>

        <button type="submit" class="submit-btn">
          <span>Sign In</span>
          <LogIn :size="18" />
        </button>

        <footer class="auth-footer">
          <span>Don't have an account?</span>
          <router-link to="/register" class="register-link">Create one</router-link>
        </footer>
      </form>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.auth-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #020617;
  font-family: 'Plus Jakarta Sans', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Background Glows */
.bg-glow-1 {
  position: absolute;
  top: 20%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  z-index: 0;
}

.bg-glow-2 {
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%);
  filter: blur(80px);
  z-index: 0;
}

.auth-viewport {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1;
}

/* Glassmorphism Card */
.glass-card {
  width: 100%;
  max-width: 420px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-icon-wrap {
  width: 56px;
  height: 56px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.accent-text { color: #60a5fa; }

.auth-header h1 {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 8px;
}

.auth-header p {
  color: #94a3b8;
  font-size: 14px;
}

/* Form Styling */
.input-group {
  margin-bottom: 20px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 8px;
  display: block;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 14px;
  color: #64748b;
  transition: color 0.3s;
}

.styled-input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  background: rgba(2, 6, 23, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.styled-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.styled-input:focus + .field-icon {
  color: #60a5fa;
}

.forgot-link {
  font-size: 12px;
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
}

/* Button */
.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

/* Footer & Errors */
.error-toast {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  padding: 12px;
  border-radius: 12px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.auth-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #94a3b8;
}

.register-link {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 700;
  margin-left: 5px;
}

/* Animations */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.shake-enter-active {
  animation: shake 0.4s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>