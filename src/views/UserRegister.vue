<template>
  <div>
    <h2>{{ $t("register") }}</h2>
    <the-form mode="register"> </the-form>
  </div>
</template>
<script>
import theForm from "./../components/theForm.vue";
export default {
  components: { theForm },
};
</script>
