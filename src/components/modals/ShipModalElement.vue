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
      <div class="flex flex-col text-right text-sm uppercase">
        <p>
          {{ saStore.assets.find((asset) => asset._id === asset_id).symbol }}
        </p>
        <p>
          {{
            saStore.assets.find((asset) => asset._id === asset_id).attributes
              .class
          }}
        </p>
        <p>
          {{
            saStore.assets.find((asset) => asset._id === asset_id).attributes
              .spec
          }}
        </p>
      </div>
    </div>
    <div class="flex flex-row pt-2">
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
    </div>
    <div class="flex flex-col pt-2">
      <line-chart
        :curve="false"
        v-if="serumMarketData"
        :data="serumMarketData.data"
      ></line-chart>
      <line-chart
        :curve="false"
        v-if="serumMarketData"
        :data="serumMarketData.data"
      ></line-chart>
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

let serumMarketData = ref({});

console.log(market_array);

const saWS = new WS_StarAtlasMarket().trades(market_array, callback_chart_data);

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
    console.log(data);

    serumMarketData.value = data;
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
