<template>
  <div class="mx-3 rounded-md shadow-xl ring-1">
    <TabNavigation></TabNavigation>
    <MarketShips></MarketShips>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { staratlasStore } from "@/stores/staratlas";

const saStore = staratlasStore();
onMounted(async () => {
  await saStore.fetchData();
  console.log(saStore.asset_types);
});
</script>

<script lang="ts">
import TabNavigation from "@/components/TabNavigation.vue";
import MarketShips from "@/components/table/elements/MarketShips.vue";

export default {
  name: "MarketTable.vue",
  components: {
    TabNavigation,
    MarketShips,
  },
};
</script>

<style scoped></style>
