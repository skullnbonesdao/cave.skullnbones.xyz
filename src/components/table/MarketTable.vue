<template>
  <div class="">
    <TabNavigation></TabNavigation>
    <div v-if="saStore.asset_type_selected == 'ship'">
      <MarketShips></MarketShips>
    </div>
    <div v-else>
      <MarketOther></MarketOther>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { staratlasStore } from "@/stores/staratlas";
import ShipModal from "@/components/modals/ShipModal.vue";

const saStore = staratlasStore();
onMounted(async () => {
  await saStore.fetchData();
  console.log(saStore.asset_types);
  await saStore.initWebSocket();
  saStore.sortData("vwap", false, 0);
});
</script>

<script lang="ts">
import TabNavigation from "@/components/TabNavigation.vue";
import MarketShips from "@/components/table/elements/MarketShips.vue";
import MarketOther from "@/components/table/elements/MarketOther.vue";

export default {
  name: "MarketTable.vue",
  components: {
    TabNavigation,
    MarketShips,
    MarketOther,
  },
};
</script>

<style scoped></style>
