<template>
  <div class="form-parent">
    <ValidationObserver v-slot="{ invalid }">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <ValidationProvider
            name="E-mail"
            rules="required|email"
            v-slot="{ errors }"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter your email ..."
              required
              @focus="clearResponseError('email')"
            ></b-form-input>
            <span class="v-validate-span">{{ errors[0] }}</span>
            <span v-if="checkErrorEmail" class="v-validate-span">{{
              "reponse error: " + error.message
            }}</span>
          </ValidationProvider>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password" label-for="input-2">
          <ValidationProvider
            name="Password"
            rules="required|min:3|max:6"
            v-slot="{ errors }"
          >
            <b-form-input
              id="input-2"
              autocomplete="username"
              v-model="form.password"
              type="password"
              placeholder="Enter your password..."
              required
              @focus="clearResponseError('pass')"
            ></b-form-input>
            <span class="v-validate-span">{{ errors[0] }}</span>
            <span v-if="checkErrorPass" class="v-validate-span">{{
              "reponse error: " + error.message
            }}</span>
          </ValidationProvider>
        </b-form-group>
        <b-form-group>
          <b-button type="submit" variant="primary" :disabled="invalid">{{
            SubmitText
          }}</b-button>
          <router-link to="/register" v-if="mode === 'login'">
            <b-badge variant="success">Signup</b-badge>
          </router-link>
        </b-form-group>
        <h4 style="text-align: center; width: 100%">{{ $t("term") }}</h4>

        <b-modal
          id="bv-modal-response errors"
          title="Response errors"
          hide-footer
        >
          <ul v-if="error">
            <li>
              {{ error.message }}
            </li>
          </ul>
        </b-modal>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  useIsFieldValid,
  localeChanged,
} from "vee-validate";
import ar from "vee-validate/dist/locale/ar.json";
import en from "vee-validate/dist/locale/en.json";
import de from "vee-validate/dist/locale/de.json";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

export default {
  beforeCreate() {
    extend("odd", (value) => {
      return value % 2 !== 0;
    });
    const lang = this.$store.state.globalLocalize;
    if (lang == "ar") {
      localize("ar", ar);
    } else if (lang == "en") {
      localize("en", en);
    } else if (lang == "de") {
      localize("de", de);
    }
  },

  components: { ValidationProvider, ValidationObserver },
  props: ["mode"],
  created() {
    window.addEventListener("storage", this.handleLocalStorageChange);
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
      localStorageData: localStorage.getItem("name"),
    };
  },
  computed: {
    SubmitText() {
      if (this.mode == "login") {
        return "Login";
      } else {
        return "Register";
      }
    },
    checkErrorEmail() {
      return this.error?.message === "EMAIL_NOT_FOUND";
    },
    checkErrorPass() {
      return this.error?.message === "INVALID_PASSWORD";
    },
  },
  methods: {
    showModelClick() {
      this.$bvModal.show("bv-modal-response errors");
    },
    clearResponseError(input) {
      // console.log(input, "err", this.error);
      if (this.error) {
        if (input == "email" && this.error.message === "EMAIL_NOT_FOUND") {
          this.error = null;
        } else if (
          input == "pass" &&
          this.error.message === "INVALID_PASSWORD"
        ) {
          this.error = null;
        }
      }
    },
    async onSubmit() {
      try {
        if (this.mode == "login") {
          await this.$store.dispatch("auth/login", this.form);
        } else if (this.mode == "register") {
          await this.$store.dispatch("auth/signup", this.form);
        }
      } catch (e) {
        // alert(e);
        // console.log(e);
      }
    },
    handleLocalStorageChange(event) {
      if (event.key === "name") {
        this.localStorageData = event.newValue;
        console.log("Local storage data changed:", this.localStorageData);
      }
    },
  },
  watch: {
    "$store.state.auth.error": {
      handler(val) {
        // console.log("watch...", val);
        if (val) {
          this.error = val[0];
          console.log("if...", this.error);

          this.showModelClick();
        }
      },
    },

    // watchLocalStorage(val) {
    //   // alert(val );
    //   window.localStorage.name = val;
    // },
  },
};
</script>
<style scoped lang="scss">
.form-parent {
  width: 50%;
  margin: 5rem auto;
}
form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.form-group {
  align-items: center;

  width: 100%;
  display: flex;
  justify-content: space-around;
  & :deep(label) {
    width: 25%;
    text-align: end;
    font-size: 1.2rem;
    font-weight: bold;
  }
  & :last-child {
    width: 50%;
  }
  & button[type="submit"],
  & a span {
    font-weight: 400;
    margin: 0 1rem !important  ;
    font-size: 1.2rem !important;
    font-family: inherit;
    line-height: 1.5 !important;
    border-radius: 0.25rem !important;
  }
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: 1.1rem;
  font-style: italic;
  padding: 0;
  & li {
    margin: 0 1rem;
  }
}
.v-validate-span {
  text-align: start;
  width: 100%;
  color: #dc3545;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
  display: block;
}
</style>
