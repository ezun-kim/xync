import { createApp } from "vue";
import Vuex from "vuex";
import store from "@/store"
import App from "@/App.vue"
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "@/router";

const app = createApp(App)
            .use(router)
            .use(store)
            .mount("#app");
