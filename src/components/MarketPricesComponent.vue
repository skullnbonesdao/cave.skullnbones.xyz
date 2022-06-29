<template>
  <div class="flex flex-row space-x-4 justify-evenly">
    <div
      v-for="market in marketDataRef"
      :key="market"
      class="my-1 p-1 rounded-lg"
    >
      <p class="text-center text-md">${{ market.bestAsk[0] }}</p>
      <p class="text-center text-sm">{{ market.market }}</p>
    </div>
  </div>
</template>
<script lang="ts">
export default { name: "MarketPricesComponent" };
</script>
<script setup lang="ts">
import { MarketWebsocket } from "@/websockets/MarketWebsocket";
import { ref } from "vue";
import { MarketLevel1 } from "@/websockets/types/MarketLevel1";

let marketWebsocket = MarketWebsocket;
let marketDataRef = ref([] as MarketLevel1[]);
marketWebsocket.initMarkets(marketDataRef);
</script>
