<template>
  <div
    class="col column flex-center bg-blue-1"
    style="user-select:none"
    v-if="show"
    @dblclick="addPostByDefault"
  >
    <h2>
      双击此处以新建一篇文章
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HexoWelcome',
  computed: {
    show () {
      return this.editorUiUnselect
    },
    // externals
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
