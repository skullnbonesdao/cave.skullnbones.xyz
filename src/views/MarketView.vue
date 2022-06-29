<template>
  <div class="flex flex-col w-full mt-3">
    <div
      class="justify-center mx-12 h-20 bg-base-300 rounded-t-box text-center"
    >
      <p class="text-4xl pt-4">Market</p>
    </div>
    <MarketPricesComponent
      class="mx-12 bg-base-300 rounded-b-box"
    ></MarketPricesComponent>
    <div class="divider"></div>
    <MarketTable
      class="justify-center mx-5 bg-base-300 rounded-box place-items-center"
    ></MarketTable>
  </div>
</template>

<script>
import MarketTable from "@/components/table/MarketTable";
import MarketPricesComponent from "@/components/MarketPricesComponent";

export default {
  name: "MarketView",
  components: { MarketPricesComponent, MarketTable },
};
</script>

<style scoped></style>
