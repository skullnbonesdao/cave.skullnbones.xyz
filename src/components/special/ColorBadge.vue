<template>
  <div>
    <div v-if="type === 'rarity'">
      <span
        class="badge text-xs border-transparent lowercase text-slate-200"
        v-bind:class="
          ' ' +
          (text === 'common' ? 'bg-gray-500' : '') +
          (text === 'uncommon' ? 'bg-green-700' : '') +
          (text === 'rare' ? 'bg-blue-700' : '') +
          (text === 'epic' ? 'bg-purple-700' : '') +
          (text === 'legendary' ? 'bg-yellow-600' : '') +
          (text === 'anomaly' ? 'bg-orange-600' : '')
        "
        >{{ text }}</span
      >
    </div>
    <div v-else-if="forceUppercase">
      <span class="badge text-xs border-transparent uppercase">{{ text }}</span>
    </div>
    <div v-else>
      <span class="badge text-xs border-transparent lowercase">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorBadge",
  props: ["type", "text", "forceUppercase"],
};
</script>

<style scoped></style>
