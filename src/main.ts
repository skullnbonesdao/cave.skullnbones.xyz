import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import SolanaWallets from "solana-wallets-vue";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import { createPinia } from "pinia";
import "solana-wallets-vue/styles.css";
import "./index.css";

import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter(),
  ],
  autoConnect: false,
};

createApp(App)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .use(VueChartkick)
  .use(SolanaWallets, walletOptions)
  .use(createPinia())
  .use(router)
  .mount("#app");
