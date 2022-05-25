<template>
  <div>
    <div class="flex justify-center">
      <div class="form-check form-switch">
        <input
          class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          @click="switch_view_mode"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwitchViewMode",
  methods: {
    switch_view_mode() {
      console.log("Toggle Mode");
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
  mounted() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
};
</script>
