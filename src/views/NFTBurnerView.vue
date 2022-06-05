<template>
  <MessageModal
    :show-modal="ref_modalShow"
    :message_text="nftburnerstore.message || ''"
    @close="ref_modalShow = false"
  ></MessageModal>

  <div class="">
    <div class="flex flex-col w-full mt-3">
      <div
        class="justify-center mx-12 h-20 card bg-base-300 rounded-box place-items-center"
      >
        <p class="text-4xl">NFT Burner</p>

        <div class="alert-warning shadow-lg text-center rounded-md px-2">
          <h3>You are about to burn your NFTs</h3>
        </div>
      </div>
      <div class="divider"></div>
      <content class="bg-base-300 mx-12 pt-5 rounded-box">
        <div class="flex flex-col text-center">
          <p class="text-xl text-red-500">
            This 'NFT-Burner' will destroy your NFT it will not be recoverable!
          </p>
          <p>
            Do use this with caution we advise you to use a separate wallet
            beside your main-wallet.
          </p>
          <p>Your NFT-SOL-Rent will be recovered!</p>
        </div>
        <div class="flex justify-center p-9">
          <div
            class="grid sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 grid-flow-row gap-4"
          >
            <nftburnercard
              v-for="nft in nftburnerstore.nftArray"
              :key="nft"
              :name="nft.data.name ? nft.data.name : 'no-name'"
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
import { defineComponent, onMounted, ref, watch } from "vue";
import MessageModal from "@/components/modals/MessageModal.vue";

defineComponent({ nftburnercard, MessageModal });

let ref_modalShow = ref(false);
const nftburnerstore = nftBurnerStore();

console.log(nftburnerstore.nftArray);
const { publicKey } = useWallet();

watch(
  () => publicKey.value,
  async function () {
    if (publicKey.value) {
      await nftburnerstore.fetchNFTs(publicKey.value.toString());
    }
    console.log(nftburnerstore.nftArray);

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
