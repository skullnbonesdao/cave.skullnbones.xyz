<template>
  <ModalComponent
    :show-modal="ref_modalShow"
    :asset_id="ref_assetID"
    @close="ref_modalShow = false"
  ></ModalComponent>
  <div :class="{ 'blur-content': ref_modalShow } + 'content'">
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
  </div>
</template>

<script setup lang="ts">
import { staratlasStore } from "@/stores/staratlas";
import { ref, unref } from "vue";
import TableAssetBadge from "@/components/table/elements/TableAssetBadge.vue";
import TableAssetElement from "@/components/table/elements/TableAssetElement.vue";

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
import ModalComponent from "@/components/modals/ModalComponent.vue";

export default {
  name: "MarketShips",
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
