<template>
  <div>
    <table class="min-w-full">
      <thead class="border-b">
        <tr>
          <th
            scope="col"
            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            <p class="uppercase">{{ saStore.asset_type_selected }}</p>
          </th>
          <th
            scope="col"
            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            First
          </th>
          <th
            scope="col"
            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Last
          </th>
          <th
            scope="col"
            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Handle
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Table ROW AUTO -->
        <tr
          v-for="nft in saStore.assets_selected"
          :key="nft._id"
          :nft="nft"
          class="bg-white border-b"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            <TableElementAsset
              class="flex-shrink-0 h-10 w-10"
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
