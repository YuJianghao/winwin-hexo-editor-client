<template>
  <div
    class="col column"
    style="user-select:none"
    v-if="show"
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
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HexoWelcome',
  computed: {
    toolbarHeight () {
      return this.editorUi.actionbar.height
    },
    toolbarStyle () {
      return {
        height: this.toolbarHeight,
        'min-height': this.toolbarHeight,
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    show () {
      return this.editorUiUnselect
    },
    // externals
    ...mapState({
      editorUi: state => state.editorUi
    }),
    ...mapGetters({
      editorUiUnselect: 'editorUi/unselect'
    })
  },
  methods: {
    async addPostByDefault () {
      this.$store.dispatch('addPostByDefault')
    }
  }
}
</script>
