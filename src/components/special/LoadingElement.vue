<template>
  <PulseLoader color="#591CD4"></PulseLoader>
</template>

<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { defineComponent } from "vue";

defineComponent({ PulseLoader });
</script>

<script>
export default {
  name: "LoadingElement",
};
</script>

<style scoped></style>
