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
              <p>Ask</p>
              <img src="tokens/ICON_ATLAS.webp" width="20" />
            </div>
          </th>
          <th>
            <div class="flex flex-row space-x-2">
              <p>Bid</p>
            </div>
          </th>
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
            <div v-for="market in nft.markets" :key="market">
              <div
                class="flex flex-row"
                v-if="market.dex && market.dex.bestAsk"
              >
                {{ market.dex.bestAsk[0] }}
                <img
                  class="h-6"
                  v-bind:src="
                    market.quotePair == USDC
                      ? 'tokens/ICON_USDC.webp'
                      : 'tokens/ICON_ATLAS.webp'
                  "
                />
              </div>
            </div>
          </td>
          <td>
            <div v-for="market in nft.markets" :key="market">
              <div
                class="flex flex-row"
                v-if="market.dex && market.dex.bestBid"
              >
                {{ market.dex.bestBid[0] }}
                <img
                  class="h-6"
                  v-bind:src="
                    market.quotePair == USDC
                      ? 'tokens/ICON_USDC.webp'
                      : 'tokens/ICON_ATLAS.webp'
                  "
                />
              </div>
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
  components: {},
};
</script>

<style scoped></style>
