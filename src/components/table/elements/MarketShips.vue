<template>
  <ModalComponent
    :show-modal="ref_modalShow"
    :asset_id="ref_assetID"
    @close="ref_modalShow = false"
  ></ModalComponent>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <TableElementHeaderSort
              :display_text="saStore.asset_type_selected"
              :entryToSort="'name'"
            ></TableElementHeaderSort>
          </th>
          <th>
            <TableElementHeaderSort
              :display_text="saStore.asset_type_selected"
              :entryToSort="'name'"
            ></TableElementHeaderSort>
          </th>
          <th>
            <TableElementHeaderSort
              :display_text="'VWAP'"
              :entryToSort="'vwap'"
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
          <th>
            <TableElementHeaderSort
              :display_text="'ASK/VWAP'"
              :entryToSort="'ask_usdc'"
            ></TableElementHeaderSort>
          </th>
          <th>
            <TableElementHeaderSort
              :display_text="'BID/VWAP'"
              :entryToSort="'bid_usdc'"
            ></TableElementHeaderSort>
          </th>
          <th>APR</th>
        </tr>
      </thead>
      <tbody>
        <!-- Table ROW AUTO -->

        <tr
          v-for="nft in saStore.assets_selected"
          :key="nft._id"
          :nft="nft"
          @click="clk_tableRow(nft._id)"
        >
          <th>
            <div class="avatar">
              <div class="w-24 mask mask-hexagon">
                <img
                  class="rounded-md"
                  :src="'sa_images/webp/' + nft._id + '.webp'"
                />
              </div>
            </div>
          </th>
          <td>
            <div class="flex flex-col space-y-1">
              <div class="col-span-2">
                <p class="text-s">{{ nft.name }}</p>
              </div>
              <div class="md:flex md:flex-row md:justify-around">
                <div>
                  <p class="text-xs">{{ nft.symbol }}</p>
                </div>
                <div>
                  <ColorBadge
                    :type="'rarity'"
                    :text="nft.attributes.rarity"
                  ></ColorBadge>
                </div>
              </div>
            </div>
          </td>
          <td>
            <p class="text-sm">
              {{ parseFloat(nft.tradeSettings.vwap).toFixed(2) }} $
            </p>
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
import { ref, unref } from "vue";

const saStore = staratlasStore();
let ref_assetID = ref("");
let ref_modalShow = ref(false);

function clk_tableRow(event: string) {
  console.log(event);
  ref_assetID.value = event;
  ref_modalShow.value = !ref_modalShow.value;
  console.log(ref_modalShow.value);
}
</script>

<script lang="ts">
import { APIData } from "@/extra/static/staratlasapi";
import LoadingElement from "@/components/special/LoadingElement.vue";
import TableElementMarketPrices from "@/components/table/elements/TableElementMarketPrices.vue";
import TableElementHeaderSort from "@/components/table/elements/TableElementHeaderSort.vue";
import ColorBadge from "@/components/special/ColorBadge.vue";
import ModalComponent from "@/components/modals/ModalComponent.vue";
import { data } from "autoprefixer";

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
    LoadingElement,
    TableElementMarketPrices,
    TableElementHeaderSort,
    ColorBadge,
    ModalComponent,
  },
};
</script>

<style scoped>
.root {
  position: relative;
}

.overlay {
  position: absolute;
  z-index: 999;
  top: 10%;
  left: 10%;
  background-color: white;
  width: 80%;
}

.overlay > div {
  background-color: #42b983;
  padding: 50px;
  border-radius: 10px;
}
</style>
