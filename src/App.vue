<template>
  <div
    id="q-app"
  >
    <router-view />
  </div>
</template>

<script>
import dispatcherService from './service/DispatcherService'
export default {
  name: 'App',
  mounted () {
    dispatcherService.setContext(this)
  }
}
</script>
