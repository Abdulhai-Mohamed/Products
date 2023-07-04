<template>
  <div>
    <h2>{{ $t("login") }}</h2>
    <the-form mode="login"> </the-form>
  </div>
</template>
<script>
import theForm from "./../components/theForm.vue";
export default {
  components: { theForm },
};
</script>
