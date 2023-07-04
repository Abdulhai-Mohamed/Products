<template>
  <v-app class="app">
    <v-main>
      <the-header></the-header>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "./components/ui/TheHeader.vue";
export default {
  name: "App",
  components: {
    TheHeader,
  },
  beforeCreate() {
    if (!this.$store.state.auth.token) {
      // alert("create");
      this.$store.dispatch("auth/tryLogin");
    }
  },
  data: () => ({
    //
  }),
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital@1&family=Maven+Pro&family=Pacifico&display=swap");
.app {
  text-align: center;
  font-family: "Lato", sans-serif;
  font-family: "Pacifico", cursive;
  font-family: "Maven Pro", sans-serif;
}
.router-link-exact-active {
  font-weight: bold;
  color: #007bff !important; /* Blue color */
}

.router-link-active {
  color: #ff6600 !important; /* Orange color */
  text-decoration: underline;
}
</style>
