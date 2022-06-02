<template>
  <div v-if="side == 'ask'">
    <div v-if="market.dex">
      <div
        class="flex flex-row space-x-1 justify-end"
        v-if="market.dex.bestAsk"
      >
        <div>{{ market.dex.bestAsk[0] }}</div>
        <div>
          <img
            class="invertible mt-1"
            width="15"
            height="15"
            v-bind:src="
              market.quotePair == 'USDC'
                ? 'tokens/ICON_USDC.webp'
                : 'tokens/ICON_ATLAS.webp'
            "
          />
        </div>
      </div>
      <div v-else class="flex flex-row space-x-1 justify-end">
        <div>no-market</div>
        <div>
          <img
            class="invertible mt-1"
            width="15"
            height="15"
            v-bind:src="
              market.quotePair == 'USDC'
                ? 'tokens/ICON_USDC.webp'
                : 'tokens/ICON_ATLAS.webp'
            "
          />
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingElement></LoadingElement>
    </div>
  </div>
  <div v-if="side == 'bid'">
    <div
      class="flex flex-row space-x-1 justify-end"
      v-if="market.dex && market.dex.bestBid"
    >
      <div>{{ market.dex.bestBid[0] }}</div>
      <div>
        <img
          class="invertible mt-1"
          width="15"
          height="15"
          v-bind:src="
            market.quotePair == 'USDC'
              ? 'tokens/ICON_USDC.webp'
              : 'tokens/ICON_ATLAS.webp'
          "
        />
      </div>
    </div>
    <div v-else>
      <LoadingElement></LoadingElement>
    </div>
  </div>
</template>

<script>
import LoadingElement from "@/components/special/LoadingElement";

export default {
  name: "TableElementMarketPrices",
  props: ["side", "market"],
  components: {
    LoadingElement,
  },
};
</script>

<style scoped>
[data-theme="dark"] .invertible {
  filter: invert(1);
}
</style>
