<template>
  <q-toolbar :style="toolbarStyle">
    <q-toolbar-title style="font-size:1.2em">
      {{title}}
    </q-toolbar-title>
  </q-toolbar>
</template>
<script>
export default {
  name: 'MetaTitle',
  props: {
    title: {
      type: String,
      default: 'Undefined Title'
    }
  },
  data: function () {
    return {
      toolbarHeight: '36px'
    }
  },
  computed: {
    toolbarStyle () {
      return {
        height: this.toolbarHeight,
        'min-height': this.toolbarHeight,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    }
  }
}
</script>
