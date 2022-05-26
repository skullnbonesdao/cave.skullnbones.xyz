<template>
  <hollow-dots-spinner
    :animation-duration="1000"
    :dot-size="10"
    :dots-num="5"
    color="#591CD4"
  />
</template>

<script setup>
import { HollowDotsSpinner } from "epic-spinners";
</script>

<script>
export default {
  name: "LoadingElement",
};
</script>

<style scoped></style>
