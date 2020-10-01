<template>
  <div
    id="q-app"
  >
    <router-view />
  </div>
</template>

<script>
import DispatcherService from './service/dispatcher_service'
export default {
  name: 'App',
  mounted () {
    DispatcherService.setContext(this)
  }
}
</script>
