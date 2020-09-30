<template>
  <div
    id="q-app"
  >
    <router-view />
  </div>
</template>

<script>
import DispatcherService from './service/DispatcherService'
export default {
  name: 'App',
  mounted () {
    DispatcherService.setContext(this)
  }
}
</script>
