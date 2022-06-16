<template>
  <Teleport to="body" id="modal">
    <div
      v-if="showModal"
      class="overlay modal-box shadow-lg max-w-2xl text-center"
    >
      <div>
        <h1 class="text-2xl rounded-md mb-2 bg-base-300">The Plank</h1>
        <p class="text-sm text-secondary">
          This Tool it built to recover the SOL form NFTs you dont want anymore.
        </p>
        <p class="text-sm text-secondary">
          It will only work if you have the permission burn!
        </p>
        <h2 class="text-md">How does this work?</h2>
        <ul class="steps steps-vertical">
          <li class="step step-primary">Connect you Solana-Wallet</li>
          <li class="step step-primary">Wait for your NFTs to load</li>
          <li class="step step-primary">
            <div class="flex flex-row space-x-2">
              <div>Choose your NFT and hit</div>
              <div>
                <button class="btn btn-xs btn-warning hover:bg-opacity-50">
                  Burn 🔥
                </button>
              </div>
            </div>
          </li>
          <li class="step step-primary">Approve the TX and wait</li>
          <li class="step step-primary">
            If the TX fails check your wallet or refresh the page!
          </li>
        </ul>
      </div>
      <button
        class="btn btn-primary hover:bg-opacity-50"
        @click="$emit('close_info')"
      >
        Continue
      </button>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  showModal: {
    type: Boolean,
    default: true,
  },
});

defineEmits("close_info");
</script>

<style scoped>
.overlay {
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
