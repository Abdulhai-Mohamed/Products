<template>
  <div>
    <nav class="mb-10 pa-6">
      <div class="ul-parent">
        <ul>
          <li><router-link to="/products">Products</router-link></li>
          <li>
            <router-link to="/cart">Cart</router-link>
            <base-badge mode="elegant">{{ cart.qty }}</base-badge>
          </li>
        </ul>

        <v-spacer></v-spacer>

        <ul>
          <li><router-link to="/auth" v-if="!isAuth"> Login</router-link></li>

          <li>
            <div v-if="isAuth">
              <b-button variant="danger" @click="logout">Logout</b-button>
              <h5 class="logout-h6">
                You will automatically logged out after :
                <span class="text-danger" v-text="counter"> </span>
                seconds
              </h5>
            </div>
          </li>
          <li>
            <div>
              <v-list>
                <v-list-group :value="false" prepend-icon="mdi-translate">
                  <template v-slot:activator>
                    <v-list-item-title>Languages</v-list-item-title>
                  </template>

                  <v-list-item link @click="SaveLang('ar')">
                    <v-list-item-title>Arabic</v-list-item-title>

                    <v-list-item-icon>
                      <v-icon>mdi-abjad-arabic</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-list-item link @click="SaveLang('en')">
                    <v-list-item-title>English</v-list-item-title>

                    <v-list-item-icon>
                      <v-icon>mdi-translate</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-list-item link @click="SaveLang('de')">
                    <v-list-item-title>German</v-list-item-title>

                    <v-list-item-icon>
                      <v-icon>mdi-translate</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      intervalId: null,
      counter: null,
      check: true,
      cart: this.$store.getters["thecartModule/cartItems"],
    };
  },

  watch: {
    "$store.state.auth.expiration": {
      immediate: true,
      handler(val) {
        if (!val) {
          // console.log("if...", val);
          this.counter = null;
          clearInterval(this.intervalId);
          this.check = true;
        } else if (val && this.check) {
          // console.log("else if...", val);
          this.check = false;
          // this.counter = val / 1000;
          this.counter = val;
          this.startCountdown();
        }
      },
    },
  },

  computed: {
    isAuth() {
      let token = this.$store.state.auth.token;
      // console.log('isAuth',token)
      if (token === null) {
        return false;
      }
      return true;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    startCountdown() {
      // console.log("startCountdown...");

      this.intervalId = setInterval(() => {
        // console.log("setInterval...", this.counter);
        this.counter--;
        if (this.counter === 0) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }, 1000);
    },
    SaveLang(lan) {
      window.localStorage.setItem("lang", lan);
      window.location.reload();
    },
  },
};
</script>
<style scoped lang="scss">
nav {
  background-color: #009688;
}
.ul-parent {
  display: flex;
}
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  & li {
    font-size: 1.5rem;
    margin: 0 1rem;
    & a {
      color: white;
      text-decoration: none;
      list-style: none;
      font-weight: bold;
    }
  }
}
.logout-h6 {
  color: white;
  margin: 1rem 0;
}
</style>
