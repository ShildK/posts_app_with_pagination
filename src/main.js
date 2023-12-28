import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import components from "./components/UI/index.js";
import store from "./store/index.js";

const app = createApp(App);

app.use(router);
app.use(store);

components.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");