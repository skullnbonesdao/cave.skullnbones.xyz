<template>
  <div>
    <nav class="flex flex-row justify-center space-x-2 bg-white dark:bg-black">
      <router-link class="router-link" to="/">Home</router-link>
      <router-link class="router-link" to="/shipsstacked">Score</router-link>
      <router-link class="router-link" to="/market">Market</router-link>
      <router-link class="router-link" to="/none">Settings</router-link>
      <router-link class="router-link" to="/about">About</router-link>
      <SwitchViewMode></SwitchViewMode>
    </nav>
  </div>
</template>
<script lang="ts">
import SwitchViewMode from "@/components/buttons/SwitchViewMode.vue";

export default {
  name: "NavigationBar",
  components: { SwitchViewMode },
};
</script>

<style scoped></style>
