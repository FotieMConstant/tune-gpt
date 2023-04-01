import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import { i18n } from "./i18n";
import "./registerServiceWorker";
import { VueProgressBar, options } from "./plugins/VueProgressBarPlugin";
import Toaster from "@meforma/vue-toaster"; // for the toast notification

const app = createApp(App);
app.use(store);
app.use(router);
app.use(i18n);
app.use(Toaster);
app.use(VueProgressBar, options);
app.mount("#app");
