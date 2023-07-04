export default {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
      state.expiration = payload.expiration;
    },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
