<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    document.getElementById('app-message').innerHTML = '初始化应用...'
  }
}
</script>
