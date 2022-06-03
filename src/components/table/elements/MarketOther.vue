<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>
            <TableElementHeaderSort
              :display_text="saStore.asset_type_selected"
              :entryToSort="'name'"
            ></TableElementHeaderSort>
          </th>
          <th>
            <TableElementHeaderSort
              :display_text="'ask'"
              :entryToSort="'ask'"
            ></TableElementHeaderSort>
          </th>
          <th>
            <TableElementHeaderSort
              :display_text="'bid'"
              :entryToSort="'bid'"
            ></TableElementHeaderSort>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Table ROW AUTO -->
        <tr
          class="hover"
          v-for="nft in saStore.assets_selected"
          :key="nft._id"
          :nft="nft"
        >
          <th>
            <table-asset-badge
              :image_url="'sa_images/webp/' + nft._id + '.webp'"
              :text="nft.symbol"
            ></table-asset-badge>
          </th>
          <td>
            <table-asset-element
              :name="nft.name"
              :rarity="nft.attributes.rarity"
              :asset_type="nft.attributes.class"
              :asset_spec="nft.attributes.spec"
            ></table-asset-element>
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
import TableAssetBadge from "@/components/table/elements/TableAssetBadge.vue";
import TableAssetElement from "@/components/table/elements/TableAssetElement.vue";
import TableElementHeaderSort from "@/components/table/elements/TableElementHeaderSort.vue";

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
  },
};
</script>

<style scoped></style>
