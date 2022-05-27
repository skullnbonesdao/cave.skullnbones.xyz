<template>
  <modal></modal>
  <NavigationBar></NavigationBar>
  <router-view />
  <FooterComponent></FooterComponent>
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
import FooterComponent from "@/components/FooterComponent";

export default {
  components: {
    NavigationBar,
    FooterComponent,
  },
  setup() {
    onMounted(() => {
      themeChange(false);
    });
  },
};
</script>
