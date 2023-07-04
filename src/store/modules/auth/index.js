import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,

  state() {
    return {
      userId: null,
      token: null,
      expiration: null,
      didAutoLogout: false,
      error: null,
    };
  },
  mutations,
  actions,
  getters,
};
