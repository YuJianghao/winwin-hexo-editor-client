<template>
  <div
    id="q-app"
    @contextmenu.prevent=""
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
