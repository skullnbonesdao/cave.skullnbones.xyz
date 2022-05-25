<template>
  <div class="home">
    <div
      class="hero min-h-screen"
      v-bind:style="{ backgroundImage: 'url(' + image_src + ')' }"
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">SKULL & BONES</h1>
          <p class="mb-5">
            Skull & Bones is Star Atlas’ 1st and largest piracy DAC
          </p>
          <button class="btn btn-primary">Go to StarAtlas</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const image_src = "pirate-ship-large.jpeg";
</script>

<script lang="ts">
export default {
  name: "HomeView",
};
</script>
