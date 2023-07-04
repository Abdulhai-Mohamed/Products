import cartMutations from './mutations.js';
import cartActions from './actions.js';
import cartGetters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      cart: { items: [], total: 0, qty: 0 },

    };
  },
  mutations: cartMutations,
  actions: cartActions,
  getters: cartGetters
};
