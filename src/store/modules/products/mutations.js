export default {
  registerProduct(state, payload) {
    state.products.push(payload);
  },
  setproducts(state, payload) {
    state.products = payload;
  },
};
