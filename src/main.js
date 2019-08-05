import Vue from "vue";
import App from "./App.vue";
import directive from "./directive";

Vue.use(directive);

new Vue({
  render: h => h(App)
}).$mount("#app");
