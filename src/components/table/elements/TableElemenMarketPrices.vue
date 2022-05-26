<template>
  <div class="flex flex-row space-x-2">
    <p class="basis-1/2 text-sm">{{ side }}</p>
    <div class="basis-1/2 text-right">
      <p class="text-base">{{ value_usdc ? value_usdc : "-" }} USDC</p>
      <p class="text-base">{{ value_atlas ? value_atlas : "-" }} ATLAS</p>
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
