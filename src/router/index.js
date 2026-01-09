import { createRouter, createWebHistory, useRouter } from "vue-router";

// pages (using @ alias)
import Home from "@/pages/Home.vue";
import Watch from "@/pages/Watch.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Channel from "@/pages/Channel.vue";
import Upload from "@/pages/Upload.vue";
import Trending from "@/pages/Trending.vue";
import Subscriptions from "@/pages/Subscriptions.vue";
import Playlist from "@/pages/Playlist.vue";

const route = useRouter();

const goLogin = () => route.push({ name: "Login" });

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/trending",
    name: "Trending",
    component: Trending,
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    component: Subscriptions,
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: Playlist,
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
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
