<template>
  <div class="mx-3 rounded-md shadow-xl ring-1">
    <TabNavigation></TabNavigation>
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <MarketShips></MarketShips>
          </div>
        </div>
      </div>
    </div>
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
