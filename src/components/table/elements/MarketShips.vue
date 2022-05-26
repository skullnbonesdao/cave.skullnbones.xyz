<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>{{ saStore.asset_type_selected }}</th>
          <th>VWAP</th>
          <th>
            <div class="flex flex-row space-x-2">
              <p>ATLAS</p>
              <img src="tokens/ICON_ATLAS.webp" width="20" />
            </div>
          </th>
          <th>
            <div class="flex flex-row space-x-2">
              <p>USDC</p>
              <img src="tokens/ICON_USDC.webp" width="20" />
            </div>
          </th>
          <th>Ask vs. VWAP</th>
          <th>Bid vs. VWAP</th>
          <th>APR</th>
        </tr>
      </thead>
      <tbody>
        <!-- Table ROW AUTO -->
        <tr v-for="nft in saStore.assets_selected" :key="nft._id" :nft="nft">
          <th>
            <div class="flex flex-row space-x-2">
              <div class="w-20">
                <img
                  class="rounded-md"
                  :src="'sa_images/webp/' + nft._id + '.webp'"
                />
              </div>
              <div class="flex flex-col text-left">
                <p class="text-base">{{ nft.name }}</p>
                <p class="text-xs">{{ nft.attributes.make }}</p>
              </div>
            </div>
          </th>
          <td>
            <p class="text-sm">
              {{ parseFloat(nft.tradeSettings.vwap).toFixed(2) }}$
            </p>
          </td>

          <td>
            <TableElementMarketPrices
              :side="'ASK'"
              :value_usdc="
                nft.markets[1]
                  ? nft.markets[1].dex
                    ? nft.markets[1].dex.bestAsk
                      ? nft.markets[1].dex.bestAsk[0]
                      : undefined
                    : undefined
                  : undefined
              "
              :value_atlas="
                nft.markets[0]
                  ? nft.markets[0].dex
                    ? nft.markets[0].dex.bestAsk
                      ? nft.markets[0].dex.bestAsk[0]
                      : undefined
                    : undefined
                  : undefined
              "
            ></TableElementMarketPrices>
          </td>
          <td>
            <TableElementMarketPrices
              :side="'Bid'"
              :value_usdc="
                nft.markets[1]
                  ? nft.markets[1].dex
                    ? nft.markets[1].dex.bestAsk
                      ? nft.markets[1].dex.bestBid[0]
                      : undefined
                    : undefined
                  : undefined
              "
              :value_atlas="
                nft.markets[0]
                  ? nft.markets[0].dex
                    ? nft.markets[0].dex.bestAsk
                      ? nft.markets[0].dex.bestBid[0]
                      : undefined
                    : undefined
                  : undefined
              "
            ></TableElementMarketPrices>
          </td>
          <td>
            <div v-if="nft.rates">
              {{ parseFloat(nft.rates.ask_usdc * 100).toFixed(1) }} %
            </div>
            <div v-else>
              <LoadingElement></LoadingElement>
            </div>
          </td>
          <td>
            <div v-if="nft.rates">
              {{ parseFloat(nft.rates.bid_usdc * 100).toFixed(1) }} %
            </div>
            <div v-else>
              <LoadingElement></LoadingElement>
            </div>
          </td>
          <td>
            <div v-if="nft.rates">
              {{ parseFloat(nft.rates.apr * 100).toFixed(1) }} %
            </div>
            <div v-else>
              <LoadingElement></LoadingElement>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { staratlasStore } from "@/stores/staratlas";

const saStore = staratlasStore();
</script>

<script lang="ts">
import TableElementMarketPrices from "@/components/table/elements/TableElemenMarketPrices.vue";
import { APIData } from "@/extra/static/staratlasapi";
import LoadingElement from "@/components/special/LoadingElement.vue";

export default {
  name: "MarketShips.vue",
  props: {
    value: {
      type: [] as APIData[],
      required: false,
      default: null,
    },
  },
  components: {
    TableElementMarketPrices,
    LoadingElement,
  },
};
</script>

<style scoped></style>
