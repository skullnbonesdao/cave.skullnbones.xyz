<template>
  <div>
    <img
      class="rounded-md"
      :src="saStore.assets.find((asset) => asset._id === asset_id).image"
      alt="sa_assetimage"
    />
    <div class="flex flex-column pt-2 justify-between">
      <h2 class="text-xl text-right">
        {{ saStore.assets.find((asset) => asset._id === asset_id).name }}
      </h2>
      <div class="flex flex-col text-right text-sm">
        <p>
          <color-badge
            :text="
              saStore.assets.find((asset) => asset._id === asset_id).symbol
            "
            :forceUppercase="true"
          ></color-badge>
        </p>
        <p>
          <color-badge
            :text="
              saStore.assets.find((asset) => asset._id === asset_id).attributes
                .class
            "
            :forceUppercase="true"
          ></color-badge>
        </p>
        <p>
          <color-badge
            :text="
              saStore.assets.find((asset) => asset._id === asset_id).attributes
                .spec
            "
            :forceUppercase="true"
          ></color-badge>
        </p>
      </div>
    </div>
    <div class="flex flex-wrap justify-between space-y-2">
      <div>
        <p class="text-xs">
          {{
            saStore.assets.find((asset) => asset._id === asset_id).description
          }}
        </p>
      </div>
      <div class="flex flex-col border-2 rounded-md p-2">
        <div class="text-center">
          <h3 class="text-xl pb-2">Attribtes</h3>
        </div>
        <div>
          <table class="table-auto">
            <tbody>
              <tr
                v-for="(obj, key) in saStore.assets.find(
                  (asset) => asset._id === asset_id
                ).attributes"
                :key="obj"
              >
                <td class="text-sm capitalize">{{ key }}</td>
                <td class="text-xs capitalize text-right">{{ obj }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-col border-2 rounded-md p-2">
        <div
          v-for="(obj, key) in saStore.assets.find(
            (asset) => asset._id === asset_id
          ).slots"
          :key="obj"
        >
          <div class="text-center">
            <h3 class="text-xl pb-2 capitalize">{{ key }}</h3>
          </div>
          <div>
            <table class="table-auto">
              <tbody>
                <tr v-for="element in obj" :key="element" class="">
                  <td class="text-sm capitalize">
                    {{ element.type }}
                  </td>
                  <td class="text-xs capitalize">
                    {{ element.size }}
                  </td>
                  <td class="text-xs capitalize">
                    {{ element.quantity }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col pt-2" v-if="serumMarketData[1]">
      <div v-for="smData in serumMarketData" :key="smData">
        <h3 class="text-2xl">
          {{
            saStore.assets
              .find((asset) => asset.id === asset_id)
              .markets.find((market) => market.id === smData.id).quotePair
          }}
        </h3>
        <line-chart
          :curve="false"
          v-if="smData"
          :data="smData.data"
        ></line-chart>
      </div>
    </div>

    <div class="flex justify-center">
      <button @click="$emit('close')" class="btn btn-default mt-2">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { staratlasStore } from "@/stores/staratlas";
import { defineEmits, defineProps, onMounted, ref, unref } from "vue";
import ColorBadge from "@/components/special/ColorBadge";

import { WS_StarAtlasMarket } from "@/extra/WS_StarAtlasMarket";

const props = defineProps(["asset_id"]);
defineEmits("close");

const saStore = staratlasStore();
const markets = saStore.assets.find(
  (asset) => asset.id === props.asset_id
).markets;

const market_array = markets.map(function (market) {
  return market.id;
});
console.log(market_array);

const saWS = new WS_StarAtlasMarket().trades(market_array, callback_chart_data);

let serumMarketData = ref([]);

function callback_chart_data(event) {
  const message = JSON.parse(event.data);
  console.log(message);

  if (!message) {
    return;
  }

  let data = {};
  let obj = {};
  data.name = "trades";
  data.data = {};
  if (message.type === "recent_trades") {
    console.log("ok");
    message.trades.map(function (trade) {
      data.data[trade.timestamp] = trade.price;
    });
    data.id = message.market;
    console.log(data);
    serumMarketData.value.push(data);
  }

  console.log("callback");
}
</script>

<script>
export default {
  name: "ShipModalElement",
};
</script>

<style scoped></style>
