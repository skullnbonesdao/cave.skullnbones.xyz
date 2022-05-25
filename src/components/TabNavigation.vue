<template>
  <div class="bg-blue-200 rounded-md px-2 shadow-xl ring-1">
    <ul
      id="tabs-tabFill"
      class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
      role="tablist"
    >
      <li
        v-for="item in saStore.asset_types"
        :key="item.value"
        class="nav-item flex-auto text-center"
        role="presentation"
      >
        <a
          v-if="saStore.asset_type_selected === item"
          id="tabs-messages-tabFill"
          aria-controls="tabs-messagesFill"
          aria-selected="false"
          class="nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
          data-bs-target="#tabs-messagesFill"
          data-bs-toggle="pill"
          role="tab"
          @click="clk_selectRowElement(item)"
        >
          {{ item }}</a
        >
        <a
          v-else
          id="tabs-messages-tabFill"
          aria-controls="tabs-messagesFill"
          aria-selected="false"
          class="nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
          data-bs-target="#tabs-messagesFill"
          data-bs-toggle="pill"
          role="tab"
          @click="clk_selectRowElement(item)"
        >
          {{ item }}</a
        >
      </li>
    </ul>
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
