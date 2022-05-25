<template>
  <!--   <CoingeckoFeed></CoingeckoFeed>-->
  <!--  <button
      data-toggle-theme="dark,light"
      data-act-class="ACTIVECLASS"
      class="bg-blue-100"
    >
      dadas
    </button>-->
  <NavigationBar></NavigationBar>
  <router-view />
</template>

<style>
#app {
}
</style>

<script setup></script>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import { onMounted } from "vue";
import { themeChange } from "theme-change";

export default {
  components: {
    NavigationBar,
  },
  setup() {
    onMounted(() => {
      themeChange(false);
    });
  },
};
</script>
