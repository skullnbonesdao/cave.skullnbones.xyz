<template>
  <div class="flex space-x-2">
    <img alt="" class="rounded-md w-10" :src="img_src" />
    <div class="flex flex-col text-left">
      <p class="text-base">{{ name }}</p>
      <p class="text-xs">{{ type }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableElementAsset",
  props: ["name", "type", "img_src"],
};
</script>

<style scoped></style>
