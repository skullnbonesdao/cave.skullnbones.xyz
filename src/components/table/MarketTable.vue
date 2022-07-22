<template>
  <div class="">
    <div v-if="is_loading" class="flex justify-center">
      <LoadingElement></LoadingElement>
    </div>
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
import { ref } from "vue";
import ShipModal from "@/components/modals/ShipModal.vue";

import LoadingElement from "@/components/special/LoadingElement.vue";

const saStore = staratlasStore();
const is_loading = ref(true);

onMounted(async () => {
  await saStore.fetchData();
  await saStore.initWebSocket();
  saStore.sortData("vwap", false, 0);
  is_loading.value = false;
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
