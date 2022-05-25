<template>
  <div class="flex space-x-2">
    <p class="text-sm">{{ side }}</p>
    <div>
      <p class="text-base">111.111USDC</p>
      <p class="text-base">111.111ATLAS</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableElementMarketPrices",
  props: ["side", "value_usdc", "value_atlas"],
};
</script>

<style scoped></style>
