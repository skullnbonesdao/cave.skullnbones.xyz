<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>{{ saStore.asset_type_selected }}</th>
          <th>Class</th>
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
            <div class="flex flex-col space-x-2">
              <div class="w-20">
                <img
                  class="rounded-md"
                  :src="'sa_images/webp/' + nft._id + '.webp'"
                />
              </div>
              <div class="flex flex-col text-left">
                <p class="text-base">{{ nft.name }}</p>
                <ColorBadge
                  :type="'rarity'"
                  :text="nft.attributes.rarity"
                ></ColorBadge>
              </div>
            </div>
          </th>
          <td>
            <p>{{ nft.attributes.class }}</p>
          </td>
          <td>
            <div v-for="market in nft.markets" :key="market">
              <TableElementMarketPrices
                :side="'ask'"
                :market="market"
              ></TableElementMarketPrices>
            </div>
          </td>
          <td>
            <div v-for="market in nft.markets" :key="market">
              <TableElementMarketPrices
                :side="'bid'"
                :market="market"
              ></TableElementMarketPrices>
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
import TableElementMarketPrices from "@/components/table/elements/TableElementMarketPrices.vue";
import ColorBadge from "@/components/special/ColorBadge.vue";

export default {
  name: "MarketOther",
  props: {
    value: {
      type: [] as APIData[],
      required: false,
      default: null,
    },
  },
  components: {
    TableElementMarketPrices,
    ColorBadge,
  },
};
</script>

<style scoped></style>
