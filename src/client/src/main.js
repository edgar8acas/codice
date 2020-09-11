import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import ToggleButton from 'vue-js-toggle-button'

Vue.config.productionTip = false;
Vue.use(SuiVue);
Vue.use(ToggleButton);
Vue.use(
  VueAxios,
  axios.create({
    baseURL: "http://localhost:3000",
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
