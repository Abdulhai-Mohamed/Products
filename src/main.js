//import plugins and components and 
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TheHeader from "./components/ui/TheHeader";
import BaseBadge from './components/ui/BaseBadge.vue';

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueGoodTablePlugin from "vue-good-table";
import axios from "./Interceotors/axios";

import i18next from "i18next";
import I18NextVue from "i18next-vue";
import resources from "./i18n/i18n.js";
import vuetify from "./plugins/vuetify";


//import files
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-good-table/dist/vue-good-table.css";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

i18next.init({
  lng: store.state.globalLocalize,
  resources,
});

Vue.component("the-header", TheHeader);
Vue.component("base-badge", BaseBadge);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueGoodTablePlugin);
Vue.use(I18NextVue, { i18next });
 

// console.log(store)
new Vue({
  // created(){
  //   // alert('mainjs')
  //     store.dispatch("auth/tryLogin");

  // },
  router,
  store,
  render: (h) => h(App),
 vuetify,
 }).$mount("#app");
