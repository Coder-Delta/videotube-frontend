import { createRouter, createWebHistory,useRouter } from "vue-router";

// pages (using @ alias)
import Home from "@/pages/Home.vue";
import Watch from "@/pages/Watch.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Channel from "@/pages/Channel.vue";

const route = useRouter();

const goLogin = () => route.push({ name: "Login" });

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/watch/:id",
    name: "Watch",
    component: Watch,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/channel/:username",
    name: "Channel",
    component: Channel,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
