import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import "@fontsource/fira-sans";

createApp(App).use(store).mount('#app');

