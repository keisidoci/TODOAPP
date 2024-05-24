import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./main.css";
import "bulma/css/bulma.css";

// Import the Auth0 configuration
import { domain, clientId } from "./auth/auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";

// Import the router instance
import router from "./router/index.js"; // Assuming your router is here

const app = createApp(App);

// Install the authentication plugin here
app.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

app.use(router); // Add the router to the app

app.config.productionTip = false;

app.mount("#app");
