<template>
  <div class="home">
    <div
      class="hero min-h-screen"
      v-bind:style="{ backgroundImage: 'url(' + image_src + ')' }"
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md space-y-10">
          <h1 class="mb-5 text-5xl font-bold">SKULL & BONES</h1>
          <p class="mb-5">
            Skull & Bones is Star Atlas’ 1st and largest piracy DAC
          </p>
          <a
            class="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://staratlas.com/"
          >
            Go to StarAtlas
          </a>
          <div>
            <p>The tools on this site are creation of the SkullnBonesDAO</p>
            <p>They are build for everyone</p>
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
