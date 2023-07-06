<template>
  <div>
    <router-view />
<div class="text-cener  ">

    <h4 class="newPro">
    <router-link to="/create-product">{{$t("create-new-product")}}</router-link>
  </h4>
</div>
    <div class="table-parent my-9 mx-auto">
      <vue-good-table :columns="columns" :rows="rows">
        <template slot="table-row" slot-scope="props">
          <div class="img-father" v-if="props.column.field == 'image'">
            <img :src="props.row.image" />
          </div>
          <div v-else-if="props.column.field == 'description'">
            <p>{{ props.row.description }}</p>
            <div>
              <!-- <b-link :to="'/products/' + props.row.id">More details</b-link> -->
              <routerLink :to="'/products/' + props.row.id"
                >More details</routerLink
              >
            </div>
            <div class="product__actions">
              <button @click="addToCart(props.row)">Add to Cart</button>
            </div>
          </div>
          <div
            v-else-if="props.column.field == 'id'"
            style="text-align: center"
          >
            <span>{{ props.row.id }}</span>
          </div>
          <div
            v-else-if="props.column.field == 'title'"
            style="text-align: center; font-family: 'Pacifico', cursive"
          >
            <span>{{ props.row.title }}</span>
          </div>
          <div
            v-else-if="props.column.field == 'price'"
            style="text-align: center"
          >
            <b-badge variant="danger"> ${{ props.row.price }} </b-badge>
          </div>
          <div
            v-else-if="props.column.field == 'category'"
            style="text-align: center"
          >
            <p
              style="font-weight: bold"
              :class="getProductClass(props.row.category)"
            >
              {{ props.row.category }}
            </p>
          </div>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>
<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      columns: [
        {
          label: "ID",
          field: "id",
          type: "number",
        },
        {
          label: "Title",
          field: "title",
        },
        {
          label: "Price",
          field: "price",
          type: "number",
        },
        {
          label: "Category",
          field: "category",
        },
        {
          label: "Description",
          field: "description",
        },
        {
          label: "Image",
          field: "image",
        },
      ],
      rows: null,
    };
  },
  methods: {
    getProductClass(category) {
      return {
        "text-warning": category === "men's clothing",
        "text-success": category === "jewelery",
        "text-primary": category === "electronics",
        "text-info": category === "women's clothing",
      };
    },
    addToCart(pay) {
      this.$store.dispatch("thecartModule/addProductToCart", {
        id: pay.id,
        image: pay.image,
        title: pay.title,
        price: pay.price,
      });
    },
  },
  async created() {
    await this.$store.dispatch("products/loadproducts");
    this.rows = this.$store.getters["products/products"];
    console.log(this.rows);
  },
};
</script>
<style scoped>
.newPro a{
  color: black;
  text-decoration: none;
}.newPro a:hover{
  color: #007bff; /* Blue */
  text-decoration: none;
}
.table-parent {
  width: 75%;
 }
.img-father {
  width: 75%;
}
.img-father img {
  width: 100%;
}
.product__actions {
  width: 100%;
  margin: 1rem;
}

button {
  font: inherit;
  cursor: pointer;
  background-color: #45006d;
  color: white;
  border: 1px solid #45006d;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
}

button:hover,
button:active {
  background-color: #760ab4;
  border-color: #760ab4;
}
</style>
