<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-vue-next";

import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import Loader from "@/components/layout/Loader.vue";

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
    localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email: email.value }));
    // Dispatch event so other components (like Navbar) can react immediately
    window.dispatchEvent(new Event('storage'));
    router.push("/");
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
          <h1>Welcome Back</h1>
        </header>

        <div v-if="error">
          <p style="color:red">{{ error }}</p>
        </div>

        <form @submit.prevent="handleLogin">
          <label>
            Email Address
            <input type="email" placeholder="name@example.com" v-model="email" required />
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