<template>
  <div>
    <div v-if="type === 'rarity'">
      <span
        class="badge text-xs border-transparent"
        v-bind:class="
          ' ' +
          (text === 'common' ? 'bg-gray' : '') +
          (text === 'uncommon' ? 'bg-green-700' : '') +
          (text === 'rare' ? 'bg-blue-700' : '') +
          (text === 'epic' ? 'bg-purple-700' : '') +
          (text === 'legendary' ? 'bg-yellow-600' : '') +
          (text === 'anomaly' ? 'bg-orange-600' : '')
        "
        >{{ text }}</span
      >
    </div>
    <div v-else>
      {{ type }}
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorBadge",
  props: ["type", "text"],
};
</script>

<style scoped></style>
