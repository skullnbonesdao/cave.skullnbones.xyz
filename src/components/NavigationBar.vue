<template>
  <nav>
    <!--    <nav class="flex flex-row justify-center space-x-2 bg-white dark:bg-black">
          <router-link class="router-link" to="/">Home</router-link>
          <router-link class="router-link" to="/shipsstacked">Score</router-link>
          <router-link class="router-link" to="/market">Market</router-link>
          <router-link class="router-link" to="/none">Settings</router-link>
          <router-link class="router-link" to="/about">About</router-link>
    
        </nav>-->
    <div class="navbar">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <router-link class="router-link" to="/">
                <div class="flex flex-row space-x-1">
                  <HomeIcon class="h-5 w-5 text-blue-500"></HomeIcon>
                  <div>Home</div>
                </div>
              </router-link>
            </li>
            <li>
              <router-link class="router-link" to="/market">
                <div class="flex flex-row space-x-1">
                  <ShoppingBagIcon
                    class="h-5 w-5 text-blue-500"
                  ></ShoppingBagIcon>
                  <div>Market</div>
                </div>
              </router-link>
            </li>
            <li>
              <router-link class="router-link" to="/shipsstacked">
                <div class="flex flex-row space-x-1">
                  <ColorSwatchIcon
                    class="h-5 w-5 text-blue-500"
                  ></ColorSwatchIcon>
                  <div>Score</div>
                </div>
              </router-link>
            </li>
            <li>
              <router-link class="router-link" to="/about">
                <div class="flex flex-row space-x-1">
                  <InformationCircleIcon
                    class="h-5 w-5 text-blue-500"
                  ></InformationCircleIcon>
                  <div>About</div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl"
          ><img
            src="@/assets/snb_logo.svg"
            alt="logo"
            class="invertible h-6 pr-2"
          />S&B
        </a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0 space-x-2">
          <li>
            <router-link
              class="router-link"
              v-bind:class="$route.name === 'home' ? ' active' : ''"
              to="/"
            >
              <div class="flex flex-col-reverse items-center">
                <div>Home</div>
                <HomeIcon class="h-5 w-5 text-blue-500"></HomeIcon>
              </div>
            </router-link>
          </li>
          <li>
            <router-link
              class="router-link"
              v-bind:class="$route.name === 'market' ? ' active' : ''"
              to="/market"
            >
              <div class="flex flex-col-reverse items-center">
                <div>Store</div>
                <ShoppingBagIcon
                  class="h-5 w-5 text-blue-500"
                ></ShoppingBagIcon>
              </div>
            </router-link>
          </li>
          <li>
            <router-link
              class="router-link"
              v-bind:class="$route.name === 'score' ? ' active' : ''"
              to="/shipsstacked"
            >
              <div class="flex flex-col-reverse items-center">
                <div>SCORE</div>
                <ColorSwatchIcon
                  class="h-5 w-5 text-blue-500"
                ></ColorSwatchIcon>
              </div>
            </router-link>
          </li>
          <li>
            <router-link
              class="router-link"
              v-bind:class="$route.name === 'burner' ? ' active' : ''"
              to="/burner"
            >
              <div class="flex flex-col-reverse items-center">
                <div>BURNER</div>
                <InformationCircleIcon
                  class="h-5 w-5 text-blue-500"
                ></InformationCircleIcon>
              </div>
            </router-link>
          </li>
          <li>
            <router-link
              class="router-link"
              v-bind:class="$route.name === 'about' ? ' active' : ''"
              to="/about"
            >
              <div class="flex flex-col-reverse items-center">
                <div>About</div>
                <InformationCircleIcon
                  class="h-5 w-5 text-blue-500"
                ></InformationCircleIcon>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-end space-x-2">
        <SwitchViewMode></SwitchViewMode>
        <wallet-multi-button dark></wallet-multi-button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import SwitchViewMode from "@/components/buttons/SwitchViewMode.vue";
import { WalletMultiButton } from "solana-wallets-vue";
import { HomeIcon } from "@heroicons/vue/outline";
import { ShoppingBagIcon } from "@heroicons/vue/outline";
import { InformationCircleIcon, ColorSwatchIcon } from "@heroicons/vue/outline";

export default {
  name: "NavigationBar",
  el: "#app",
  components: {
    WalletMultiButton,
    SwitchViewMode,
    ShoppingBagIcon,
    HomeIcon,
    InformationCircleIcon,
    ColorSwatchIcon,
  },
};
</script>

<style scoped>
[data-theme="dark"] .invertible {
  filter: invert(1);
}
</style>
