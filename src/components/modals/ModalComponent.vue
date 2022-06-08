<template>
  <Teleport to="body" id="modal">
    <div v-if="showModal" class="overlay modal-box shadow-lg max-w-2xl">
      <ship-modal-element
        :asset_id="asset_id"
        @close="$emit('close')"
      ></ship-modal-element>
    </div>
  </Teleport>
</template>

<script setup>
import { defineEmits } from "vue";
import ShipModalElement from "@/components/modals/ShipModalElement";

defineEmits("close");
</script>
<script>
export default {
  name: "ModalComponent",
  props: ["showModal", "asset_id"],
  components: {},
};
</script>

<style scoped>
.overlay {
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/*
.overlay > div {
  padding: 50px;
  border-radius: 10px;
}*/
</style>
