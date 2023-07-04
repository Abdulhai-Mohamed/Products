import Vue from "vue";
import VueRouter from "vue-router";
import AppLogin from "./../views/AppLogin.vue";
import CreateProduct from "./../views/CreateProduct.vue";
 import AppProducts from "./../views/AppProducts.vue";
import productDetails from "./../views/productDetails.vue";
import UserRegister from "./../views/UserRegister.vue";
import NotFound from "./../views/NotFound";
import UserCart from './../views/UserCart.vue';

import store from "./../store";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/products" },
   {
    path: "/products",
    component: AppProducts,
  },
  {
    path: "/products/:id",
    props: true,
    component: productDetails,
    meta: { requiresAuth: true },
  },

  {
    path: "/register",
    component: UserRegister,
    meta: { requiresUnauth: true },
  },
  {
    path: "/cart",
    component: UserCart,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-product",
    component: CreateProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    component: AppLogin,
    meta: { requiresUnauth: true },
    async beforeEnter(to, from, next) {
      if (store.state.auth.token) {
        alert("  auth");
        await next("/products");
      }

      await next();
    },
  },
  { path: "/:notFound(.*)", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(async function (to, from, next) {
  if (to.meta.requiresAuth && !store.state.auth.token) {
    // alert("requires auth");
    await store.dispatch("auth/tryLogin");
    if (store.state.auth.token) {
      // alert("requires ausssssssssssssssssssssssth");
      // console.log(window.location,'locc');
      // console.log(from);
      await next();
    } else {
      await next("/auth");
    }
  } else {
    await next();
  }
});
export default router;
