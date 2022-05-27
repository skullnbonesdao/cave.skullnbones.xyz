<template>
  <img
    class="rounded-md"
    :src="saStore.assets.find((asset) => asset._id === asset_id).image"
    alt="sa_assetimage"
  />
  <div class="flex justify-around pt-2">
    <h2 class="text-xl text-left">
      {{ saStore.assets.find((asset) => asset._id === asset_id).name }}
    </h2>
    <div class="text-sm uppercase">
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
          saStore.assets.find((asset) => asset._id === asset_id).attributes.spec
        }}
      </p>
    </div>
  </div>
  <div class="flex flex-row pt-2">
    <div>
      <p class="text-xs">
        {{ saStore.assets.find((asset) => asset._id === asset_id).description }}
      </p>
    </div>
    <div class="flex flex-col border-2 rounded-md">
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
  <div class="flex justify-center">
    <button @click="$emit('close')" class="btn btn-default mt-2">Close</button>
  </div>
</template>

<script setup>
import { staratlasStore } from "@/stores/staratlas";
import { defineEmits } from "vue";

const saStore = staratlasStore();

defineEmits("close");
</script>
<script>
export default {
  name: "ShipModalElement",
  props: ["asset_id"],
  components: {},
};
</script>

<style scoped></style>
