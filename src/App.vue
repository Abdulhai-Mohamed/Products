<template>
  <v-app class="app">
    <v-main>
      <div class="content">
        <the-header></the-header>
        <router-view />
      </div>
      <div class="footer">
        <the-footer></the-footer>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "./components/ui/TheHeader.vue";
import TheFooter from "./components/ui/TheFooter.vue";
export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
.app {
  text-align: center;
 
  font-family: 'Roboto', sans-serif;

}
.v-main__wrap {
  height: 100%;
  min-height: 100vh;

  margin: 0;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
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
