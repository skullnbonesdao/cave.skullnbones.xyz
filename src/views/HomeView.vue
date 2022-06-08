<template>
  <div class="home">
    <div
      class="hero min-h-screen"
      v-bind:style="{ backgroundImage: 'url(' + image_src + ')' }"
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="space-y-10">
          <h1 class="mb-5 text-5xl font-bold">SKULL & BONES</h1>
          <p class="mb-5">
            Skull & Bones is Star Atlas’ 1st and largest piracy DAC
          </p>
          <div class="flex flex-col space-y-2">
            <a
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://skullnbones.xyz/"
            >
              Skull&Bones
            </a>
            <a
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://staratlas.com/"
            >
              StarAtlas
            </a>
          </div>
          <div>
            <p>This is not a service by StarAtlas</p>
            <p>The tools on this site are creation of the Skull&BonesDAO</p>
            <p>They are built for everyone</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const image_src = "pirate-ship-large.jpg";
</script>

<script lang="ts">
export default {
  name: "HomeView",
};
</script>
