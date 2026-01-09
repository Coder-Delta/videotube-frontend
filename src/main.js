import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

// global styles
import "@picocss/pico/css/pico.min.css"; // Import Pico CSS
import "./assets/main.css";

createApp(App)
  .use(router)
  .mount("#app");
