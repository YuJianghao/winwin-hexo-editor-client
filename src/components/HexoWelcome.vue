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
    <div
      class="col column flex-center bg-blue-1"
      @dblclick="addPostByDefault"
    >
      <h2>
        双击此处以新建一篇文章
      </h2>
    </div>
  </div>
</template>

<script>
import * as actionTypes from 'src/store/dispatcher/action-types'
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
  },
  methods: {
    async addPostByDefault () {
      this.$store.dispatch(actionTypes.addPostByDefault)
    }
  }
}
</script>
