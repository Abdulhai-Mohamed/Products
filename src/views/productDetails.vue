<template>
  <div>
    <h1>product details</h1>
    <p>product id is: {{ id }}</p>
   </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {};
  },
};
</script>
