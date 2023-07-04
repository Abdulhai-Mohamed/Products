<template>
  <div>
    <div class="form-parent">
      <h2>{{ $t("createProduct") }}</h2>
      <v-form ref="form" v-model="valid" @submit.prevent="OnSubmit">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          type="number"
          :counter="6"
          v-model="number"
          :rules="numberRules"
          label="Price"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Category is required']"
          label="Categories"
          required
        ></v-select>
        <v-text-field
          v-model="desc"
          :rules="descRules"
          label="Description"
          required
        ></v-text-field>

        <div>
          <v-file-input
            label="pick image"
            counter
            show-size
            small-chips
            truncate-length="28"
            v-model="img"
            :rules="imgRules"
          ></v-file-input>
        </div>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
        <v-btn color="primary" type="submit" :disabled="!valid"> Submit </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script>
import theForm from "./../components/theForm.vue";

export default {
  components: { theForm },
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length <= 10) || "Title must be less than 10 characters",
      ],
      desc: "",
      descRules: [
        (v) => !!v || "Description is required",
        (v) =>
          (v && v.length >= 20) ||
          "Description must be greater than 20 characters",
      ],

      number: "",
      numberRules: [
        (v) => !!v || "Price is required ysta",
        // (v) => /^\$[\d.,]+$/i.test(v) || "Price must be valid and end with $",
        (v) => (v && v.length <= 6) || "Price must be less than 7 characters",
      ],
      select: null,
      items: ["men's clothing", "electronics", "jewelery", "women's clothing"],
      img: null,
      imgRules: [
        (v) => !!v || "Images is required ysta",
        (v) => {
          return /\.png$/i.test(v?.name) || "Image shoud be PNG";
        },
        (v) =>
          (v && v.size / 1000000 <= 0.6) ||
          "Image size shoud not exceed .5 megabyte",
      ],
      products: this.$store.getters[`products/products`],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    OnSubmit() {
      this.validate();
      if (this.valid) {
        // console.log(this.name);
        // console.log(this.desc);
        // console.log(this.number);
        // console.log(this.select);
        // console.log(this.img);
        // let fileURL = URL.createObjectURL(this.img);
        // console.log(fileURL);
        this.products.push({
          id: this.products.length +1,
          title: this.name,
          price: this.number,
          category: this.select,
          description: this.desc,
          image:'https://cdn.vectorstock.com/i/1000x1000/82/99/no-image-available-like-missing-picture-vector-43938299.webp'
        });
        this.$router.replace('/products')
      }
    },
  },
};
</script>
<style scoped lang="scss">
.form-parent {
  text-align: center;
  width: 40%;
  margin: auto;
}
</style>
