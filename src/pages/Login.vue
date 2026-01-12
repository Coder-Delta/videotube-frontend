<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-vue-next";

import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/layout/Loader.vue";

import { setAuthData } from "@/utils/cookie";
import authService from "@/services/auth.service.js";

const router = useRouter();

const email = ref("");
const username = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = "";
  if (!email.value || !password.value) {
    error.value = "Please enter username or email and password";
    return;
  }

  isLoading.value = true;
  try {
    const payload = { password: password.value };
    if (email.value.includes('@')) {
      payload.email = email.value;
    } else {
      payload.username = email.value;
    }

    const response = await authService.loggedInUser(payload);
    const { accessToken, loggedInUser } = response.data;

    setAuthData(accessToken, loggedInUser);

    window.dispatchEvent(new Event('storage')); // Keeping this to trigger Navbar update (we'll update navbar to listen to this or check cookies)
    router.push("/");
  } catch (err) {
    console.error(err);
    error.value = err.message || "Login failed.";
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
          <h1>Welcome Back</h1>
        </header>

        <div v-if="error">
          <p style="color:red">{{ error }}</p>
        </div>

        <form @submit.prevent="handleLogin">
          <label>
            Username or Email
            <input type="text" placeholder="Username or name@example.com" v-model="email" required />
          </label>

          <label>
            Password
            <input type="password" placeholder="••••••••" v-model="password" required />
          </label>

          <small>
            <router-link to="/forgot">Forgot Password?</router-link>
          </small>

          <button type="submit">Sign In</button>
        </form>

        <footer>
          <small>Don't have an account? <router-link to="/register">Create one</router-link></small>
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
  /* Account for nav/footer approx height */
  padding: 2rem 1rem;
}

article {
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--pico-muted-border-color);
  background: var(--pico-card-background-color);
}
</style>