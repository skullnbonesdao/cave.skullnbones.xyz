<template>
  <div class="flex flex-wrap">
    <div class="grow">
      <p>{{ name }}</p>
      <div class="flex space-x-2">
        <color-badge :type="'rarity'" :text="rarity"></color-badge>
        <color-badge :text="asset_type"></color-badge>
        <color-badge :text="asset_spec"></color-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ColorBadge from "@/components/special/ColorBadge";

defineProps({
  name: {
    type: String,
    default: "asset_name",
  },
  rarity: {
    type: String,
    default: "common",
  },
  asset_type: {
    type: String,
    default: "small",
  },
  asset_spec: {
    type: String,
    default: "fighter",
  },
});
</script>

<style scoped></style>
