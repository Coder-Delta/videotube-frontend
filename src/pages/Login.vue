<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

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
    error.value = "Email and password are required";
    return;
  }

  isLoading.value = true;

  // Simulate API call (replace with real backend)
  setTimeout(() => {
    isLoading.value = false;

    console.log("Login payload:", {
      email: email.value,
      password: password.value,
    });

    // Redirect after login
    router.push("/");
  }, 1500);
};
</script>

<template>
  <Loader v-if="isLoading" />

  <div v-else class="page">
    <!-- Navbar -->
    <Navbar />

    <!-- Login Content -->
    <main class="auth-container">
      <form class="auth-card" @submit.prevent="handleLogin">
        <h2>Login to Videotube</h2>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            v-model="email"
          />
        </div>

        <div class="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            v-model="password"
          />
        </div>

        <button type="submit" class="primary-btn">
          Login
        </button>

        <p class="redirect">
          Don’t have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </form>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0a0e1a, #1a1f3a);
  color: #e5e7eb;
}

/* Auth layout */
.auth-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

/* Card */
.auth-card {
  width: 100%;
  max-width: 360px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 12px;
  padding: 28px;
  border: 1px solid rgba(148, 163, 184, 0.15);
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* Error */
.error {
  background: rgba(127, 29, 29, 0.9);
  color: #fecaca;
  padding: 8px;
  border-radius: 6px;
  font-size: 13px;
  margin-bottom: 12px;
  text-align: center;
}

/* Fields */
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
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #020617;
  color: #ffffff;
  outline: none;
}

.field input:focus {
  border-color: #60a5fa;
}

/* Button */
.primary-btn {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  color: #020617;
  font-weight: 600;
  cursor: pointer;
}

.primary-btn:hover {
  opacity: 0.9;
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

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
