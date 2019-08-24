import Vue from "vue";
import App from "./App.vue";

// Styles
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/font-awesome.min.css";

// Javascript
import "jquery";
import "bootstrap";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
