<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
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
          <td>
            <TableElementAsset
              class=""
              :name="nft.name"
              :type="nft.attributes.make"
              :img_src="'sa_images/webp/' + nft._id + '.webp'"
            ></TableElementAsset>
          </td>
          <td>
            <p class="text-sm">
              {{ parseFloat(nft.tradeSettings.vwap).toFixed(2) }}$
            </p>
          </td>
          <td>
            <TableElementMarketPrices :side="'ASK'"></TableElementMarketPrices>
          </td>
          <td>
            <TableElementMarketPrices :side="'Bid'"></TableElementMarketPrices>
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
import TableElementAsset from "@/components/table/elements/TableElementAsset.vue";
import TableElementMarketPrices from "@/components/table/elements/TableElemenMarketPrices.vue";

export default {
  name: "MarketShips.vue",
  props: ["ships"],
  components: {
    TableElementAsset,
    TableElementMarketPrices,
  },
};
</script>

<style scoped></style>
