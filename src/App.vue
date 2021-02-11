<template>
  <div id="q-app">
    <router-view />
    <notifications position="bottom right"></notifications>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 12px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: $warning !important;
    border-left-color: darken($color: $warning, $amount: 10) !important;
  }

  &.error {
    background: $negative !important;
    border-left-color: darken($color: $negative, $amount: 10) !important;
  }

  &.success {
    background-color: $positive !important;
    border-left-color: darken($color: $positive, $amount: 10) !important;
  }
}
</style>
