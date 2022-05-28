<template>
  <div class="form-check form-switch"></div>
  <div>
    <div class="flex justify-center">
      <div class="form-check form-switch">
        <input
          class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          data-toggle-theme="dark,light"
          data-act-class="ACTIVECLASS"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwitchViewMode",
};
</script>
