import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import { createPinia } from "pinia";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createApp(App).use(VueChartkick).use(createPinia()).use(router).mount("#app");
