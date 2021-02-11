<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  async created() {
    await this.$store.dispatch("user/info");
    // TODO: 路由跳转
    console.log("已登录", this.$store.state.user.alive);
  }
};
</script>
