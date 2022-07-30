import { defineStore } from "pinia";
import { useWallet } from "solana-wallets-vue";

import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "@nfteyez/sol-rayz";
import { SolRayzType } from "@/extra/static/sol-rayz-type";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SOLANANETWORK } from "@/extra/static/const";

export const nftBurnerStore = defineStore({
  id: "nftburner_store",
  state: () => ({
    nftArray: [] as Array<SolRayzType>,
    message: {},
  }),
  actions: {
    async fetchNFTs(wallet_address: string) {
      console.log("WalletAddress:" + wallet_address);

      const publicAddress = await resolveToWalletAddress({
        text: wallet_address,
      });

      this.nftArray = await getParsedNftAccountsByOwner({
        publicAddress,
      });
    },
    async fetchData() {
      console.log("Fetching additional Data for NFTs...");
      for (const nft in this.nftArray) {
        await fetch(this.nftArray[nft].data.uri)
          .then((response) => response.json())
          .then((data) => {
            this.nftArray[nft].data.img_url = data.image;
          })
          .catch((err) => console.log(err));
      }
    },
    async burnToken(token_address: string) {
      console.log("Start TokenBurn!");
      console.log(token_address);

      try {
        const mintPublickey = new PublicKey(token_address);
        const { publicKey } = useWallet();

        if (publicKey.value) {
          const associatedAddress = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintPublickey,
            publicKey.value
          );
          const burnInstruction = await Token.createBurnInstruction(
            TOKEN_PROGRAM_ID,
            mintPublickey,
            associatedAddress,
            publicKey.value,
            [],
            1
          );

          const closeInstruction = await Token.createCloseAccountInstruction(
            TOKEN_PROGRAM_ID,
            associatedAddress,
            publicKey.value,
            publicKey.value,
            []
          );

          const BurnandCloseTransaction = new Transaction().add(
            burnInstruction,
            closeInstruction
          );

          const connection = new Connection(clusterApiUrl(SOLANANETWORK));

          const BurnandCloseSignature = await useWallet().sendTransaction(
            BurnandCloseTransaction,
            connection
          );

          const confirmed = await connection.confirmTransaction(
            BurnandCloseSignature,
            "processed"
          );
          if (confirmed) {
            this.message = "NFT has been deleted!";
            console.log("deleted NFT");
          } else {
            this.message = "NFT-TX has not been confirmed!";
            console.log("Error DELETE");
          }
        } else {
          this.message = "Please connect wallet first!";
          console.log("Wallet not connetded");
        }
      } catch (error) {
        this.message = "Error burning NFT";
        console.log(error);
      }
    },
  },
});
