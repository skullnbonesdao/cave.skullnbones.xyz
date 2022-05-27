<template>
  <div class="flex flex-col w-full mt-3">
    <div
      class="justify-center mx-12 h-20 card bg-base-300 rounded-box place-items-center"
    >
      <p class="text-4xl">Market</p>
    </div>
    <div class="divider"></div>
    <MarketTable></MarketTable>
  </div>
</template>

<script>
import MarketTable from "@/components/table/MarketTable";

export default {
  name: "MarketView",
  components: { MarketTable },
};
</script>

<style scoped></style>
