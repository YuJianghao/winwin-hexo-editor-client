<template>
  <div id="q-app">
    <router-view />
    <notifications position="bottom right"></notifications>
    <q-inner-loading :showing="pageLoading">
      <q-spinner-tail size="25px" color="primary" />
      <div class="loading-text">正在载入页面...</div>
    </q-inner-loading>
  </div>
</template>
<script>
import asyncload from "src/services/asyncload";
export default {
  name: "App",
  data() {
    return {
      asyncload: asyncload.state
    };
  },
  computed: {
    pageLoading() {
      return (
        Object.keys(this.asyncload)
          .map(key => this.asyncload[key])
          .filter(item => item.meta.page && item.loading).length > 0
      );
    }
  },
  created() {
    this.$q.dark.set("auto");
  },
  mounted() {
    const initLoading = document.getElementById("init-loading");
    initLoading.style.opacity = 0;
    window.setTimeout(() => {
      document.body.removeChild(initLoading);
    }, 200);
  }
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
