<template>
  <Teleport to="body" id="modal">
    <div
      v-if="showModal"
      class="max-w-xl overlay alert alert-warning shadow-lg"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>{{ message_text }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: true,
  },
  message_text: {
    type: String,
    default: "some text message",
  },
});
</script>

<script lang="ts">
export default {
  name: "MessageModal.vue",
};
</script>

<style scoped>
.overlay {
  z-index: 9999;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
