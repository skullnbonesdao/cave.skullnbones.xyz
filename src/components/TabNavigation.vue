<template>
  <div class="tabs justify-center">
    <a
      v-for="element in saStore.asset_types"
      :key="element"
      v-bind:class="
        'tab tab-lifted uppercase ' +
        (saStore.asset_type_selected === element ? 'tab-active' : '')
      "
      @click="clk_selectRowElement(element)"
      >{{ element }}</a
    >
  </div>
</template>

<script>
import { staratlasStore } from "@/stores/staratlas";

export default {
  name: "TabNavigation",
  data() {
    return {
      saStore: staratlasStore(),
    };
  },
  methods: {
    clk_selectRowElement(selected) {
      this.saStore.asset_type_selected = selected;
      this.saStore.filterDataSelected();
    },
  },
};
</script>

<style scoped></style>
