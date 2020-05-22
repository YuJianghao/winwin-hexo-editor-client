<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    const loading = document.getElementById('app-loading')
    loading.style.opacity = 0
    window.setTimeout(() => {
      loading.style.display = 'none'
    }, 500)
  }
}
</script>
