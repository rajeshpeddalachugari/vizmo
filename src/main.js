import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import empStore from "./store.js";

const app = createApp(App);
const store = createStore(empStore);
app.use(store);
app.mount("#app");
