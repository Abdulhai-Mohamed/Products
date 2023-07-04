<template>
  <div>
    <!-- <b-button @click="showModal">Open Modal</b-button>
    <b-modal hide   >
      {{ lol.title }}
    </b-modal>

    <h1>{{ modalVisible }}</h1> -->
    <div>
      <h4>click to load all fire base Coaches</h4>
      <button @click="loadCoaches">load</button>
      <ul v-if="coaches">
        <li v-for="c in coaches" :key="c[0]">
          {{ c[1].firstName + "  " + c[1].lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      modalVisible: false,
      lol: undefined,
      coaches: null,
      token: null,
    };
  },
  created() {
    // axios.get(
    //   `https://vue-http-7c739-default-rtdb.firebaseio.com//coaches.json`
    // ).catch;
  },
  computed: {
    Theoken() {
       return this.$store.state.auth.token;
    },
  },
  methods: {
    showModal() {
      // this.$refs.myModal.show();
    },
    async loadCoaches() {
      const response = await axios
        .get(
          `https://vue-http-7c739-default-rtdb.firebaseio.com//coaches.json?auth=${this.Theoken}`
        )
        .then((res) => {
          console.log("response load coaches  ", res);

          const { status, data } = res;
          if (status === 200) {
            this.coaches = Object.entries(data);
          }
        })
        .catch((err) => console.log(err, "loadCoachesa err"));
    },
  },
};
// CREATE JS BUBLE SOR
</script>
<style scoped lang="scss">
ul {
  list-style: none;
  font-size: 2rem;
  & li {
    margin: 0 1rem;
  }
}
button {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1.8rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
