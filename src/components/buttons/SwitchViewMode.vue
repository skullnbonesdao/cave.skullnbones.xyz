<template>
  <div>
    <div class="flex justify-center">
      <div class="form-check form-switch">
        <input
          class="toggle toggle-primary"
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

<style scoped></style>
