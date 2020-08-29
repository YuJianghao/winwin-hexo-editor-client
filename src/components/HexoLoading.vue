<template>
  <div
    class="fit column"
    style="user-select:none"
  >
    <q-toolbar
      class="bg-grey-2 q-px-none"
      :style="toolbarStyle"
    >
    </q-toolbar>
    <div class="col column flex-center">
      <q-spinner-gears
        size="50px"
        color="primary"
      />
      <h2>
        正在加载文章
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HexoWelcome',
  computed: {
    toolbarStyle () {
      return {
        height: '36px',
        'min-height': '36px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    }
  }
}
</script>
