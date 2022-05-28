<template>
  <div class="static flex flex-col items-center">
    <div class="avatar">
      <div class="w-12 mask mask-hexagon">
        <img class="rounded-md" :src="image_url" alt="asset_image" />
      </div>
    </div>
    <div class="absolute bottom-0 pb-1">
      <div class="badge">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  text: {
    type: String,
    default: "asset_name",
  },
  image_url: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
