import Vue from "vue";
import Vuex from "vuex";
import productsModule from "./modules/products/index.js";
import authModule from "./modules/auth/index.js";
import cartModule from './modules/cart/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    globalLocalize: localStorage.getItem("lang") || "en",
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    products: productsModule,
    auth: authModule,
    thecartModule: cartModule,

  },
});
