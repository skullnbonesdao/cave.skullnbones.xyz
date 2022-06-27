<template>
  <div>
    <!--    <img
          class="rounded-md"
          :src="saStore.assets.find((asset) => asset._id === asset_id).image"
          alt="sa_assetimage"
        />-->
    <div class="bg-base-300 p-3 pt-10 rounded-md shadow-lg">
      <agile
        :autoplay="true"
        :autoplay-speed="3500"
        :speed="600"
        :dots="true"
        :centerMode="true"
      >
        <div
          class="slide grid place-items-center"
          v-for="img_src in saStore.assets.find(
            (asset) => asset._id === asset_id
          ).media.gallery"
          :key="img_src"
        >
          <img
            class="max-h-64 rounded-md"
            :src="img_src"
            alt="sa_asset_image"
          />
        </div>
      </agile>
      <div class="flex flex-column pt-2 justify-between">
        <div class="flex flex-col">
          <h2 class="text-2xl text-primary">
            {{ saStore.assets.find((asset) => asset._id === asset_id).name }}
          </h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="
              'https://play.staratlas.com/market/' +
              saStore.assets.find((asset) => asset._id === asset_id).markets[0]
                .id
            "
            class="link text-secondary"
          >
            play.staratlas.com</a
          >
          <a
            target="_blank"
            rel="noopener noreferrer"
            :href="
              'https://solscan.io/token/' +
              saStore.assets.find((asset) => asset._id === asset_id).mint
            "
            class="link text-secondary"
          >
            solcan.io</a
          >
        </div>
        <div class="flex flex-col text-right text-sm space-y-1">
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
                saStore.assets.find((asset) => asset._id === asset_id)
                  .attributes.class
              "
              :forceUppercase="true"
            ></color-badge>
          </p>
          <p>
            <color-badge
              :text="
                saStore.assets.find((asset) => asset._id === asset_id)
                  .attributes.spec
              "
              :forceUppercase="true"
            ></color-badge>
          </p>
        </div>
      </div>
      <div>
        <p class="text-sm my-2">
          {{
            saStore.assets.find((asset) => asset._id === asset_id).description
          }}
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-around p-2 shadow-lg bg-base-300">
      <h3 class="text-xl text-center text-secondary">Attribtes</h3>
      <table class="table-auto table-zebra m-3">
        <tbody>
          <tr
            v-for="(obj, key) in saStore.assets.find(
              (asset) => asset._id === asset_id
            ).attributes"
            :key="obj"
          >
            <td class="text-md capitalize">{{ key }}</td>
            <td class="text-sm capitalize text-right">{{ obj }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-col justify-around p-2 bg-base-300 rounded-b-xl">
      <div
        v-for="(obj, key) in saStore.assets.find(
          (asset) => asset._id === asset_id
        ).slots"
        :key="obj"
      >
        <h3 class="text-xl text-center pb-2 capitalize text-secondary">
          {{ key }}
        </h3>
        <table class="table-auto w-full table-zebra">
          <tbody>
            <tr v-for="element in obj" :key="element" class="">
              <td class="text-sm capitalize text-left">
                {{ element.type }}
              </td>
              <td class="w-5 text-xs uppercase text-center">
                {{ element.size }}
              </td>
              <td class="w-5 text-sm capitalize text-right">
                {{ element.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="flex flex-col mt-2 p-2 bg-base-300 rounded-xl"
      v-if="serumMarketData[1]"
    >
      <h2 class="text-2xl text-left text-secondary">Markets</h2>
      <div v-for="smData in serumMarketData" :key="smData" class=" ">
        <h3 class="text-2xl text-center text-secondary">
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
import {
  defineComponent,
  defineEmits,
  defineProps,
  onMounted,
  ref,
  unref,
} from "vue";
import ColorBadge from "@/components/special/ColorBadge";

import { VueAgile } from "vue-agile";

import { WS_StarAtlasMarket } from "@/extra/WS_StarAtlasMarket";

const props = defineProps(["asset_id"]);
defineEmits("close");
defineComponent({ VueAgile });

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

<style scoped>
.example-slide {
  align-items: center;
  background-color: #666;
  color: #999;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  min-height: 10rem;
}
</style>
