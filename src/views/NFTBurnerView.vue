<template>
  <MessageModal
    :show-modal="ref_modalShow"
    :message_text="nftburnerstore.message || ''"
    @close="ref_modalShow = false"
  ></MessageModal>
  <FireElement style="opacity: 0.1"></FireElement>
  <div class="">
    <div class="flex flex-col w-full mt-3">
      <div
        class="justify-center mx-12 p-3 card bg-base-300 rounded-box place-items-center"
      >
        <p class="text-4xl">The Plank</p>

        <div class="alert-warning shadow-lg text-center rounded-md px-2">
          <p>🔥 You are about to burn your NFTs 🔥</p>
        </div>
      </div>
      <div class="divider"></div>
      <content class="bg-base-300 mx-12 pt-5 rounded-box">
        <div class="flex flex-col text-center">
          <p class="text-xl text-red-500">
            The Plank will <b>destroy</b> your NFT it will not be recoverable!
          </p>
          <p>
            Do use this with caution we advise you to use a separate wallet
            beside your main-wallet.
          </p>
          <p>Your NFT-SOL-Rent will be recovered!</p>
        </div>
        <div
          v-if="!publicKey"
          class="flex flex-col items-center pt-10 space-y-2"
        >
          <p class="text-xl">You are not connected!</p>
          <wallet-multi-button dark></wallet-multi-button>
        </div>
        <div class="flex justify-center p-9">
          <div
            class="grid sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 grid-flow-row gap-4"
          >
            <nftburnercard
              v-for="nft in nftburnerstore.nftArray"
              :key="nft"
              :name="nft.data.name ? nft.data.name : 'unknown'"
              :mint="nft.mint"
              :img_url="nft.data.img_url"
            >
            </nftburnercard>
          </div>
        </div>
      </content>
    </div>
  </div>
</template>

<script setup lang="ts">
import nftburnercard from "@/components/special/NFTBurnerCard.vue";
import { nftBurnerStore } from "@/stores/NFTBurnerStore";
import { useWallet } from "solana-wallets-vue";
import { WalletMultiButton } from "solana-wallets-vue";
import { defineComponent, onMounted, ref, watch } from "vue";
import MessageModal from "@/components/modals/MessageModal.vue";
import FireElement from "@/components/elements/FireElement.vue";

defineComponent({ nftburnercard, MessageModal });

let ref_modalShow = ref(false);
const nftburnerstore = nftBurnerStore();

console.log(nftburnerstore.nftArray);
const { publicKey } = useWallet();

onMounted(async function () {
  if (publicKey.value) {
    await nftburnerstore.fetchNFTs(publicKey.value.toString());
  }
  await nftburnerstore.fetchData();
});

watch(
  () => publicKey.value,
  async function () {
    if (publicKey.value) {
      await nftburnerstore.fetchNFTs(publicKey.value.toString());
    }
    await nftburnerstore.fetchData();
  }
);

watch(
  () => nftburnerstore.message,
  async function () {
    if (nftburnerstore.message != "") {
      ref_modalShow.value = true;
      await new Promise((r) => setTimeout(r, 3000));
      ref_modalShow.value = false;
      nftburnerstore.message = "";
    }
  }
);
</script>
<script lang="ts">
export default {
  name: "NFTBurnerView",
};
</script>

<style scoped></style>
