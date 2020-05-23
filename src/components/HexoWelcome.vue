<template>
  <div
    class="col column flex-center bg-blue-1"
    style="user-select:none"
    v-if="editorUiUnselect"
    @dblclick="addPostByDefault"
  >
    <h2>
      {{editorCoreDataPostEmpty?'':'选择或'}}新建一篇文章
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HexoWelcome',
  computed: {
    ...mapGetters({
      editorUiUnselect: 'editorUi/unselect',
      editorCoreDataPostEmpty: 'editorCore/dataPostEmpty'
    })
  },
  methods: {
    async addPostByDefault () {
      this.$store.dispatch('addPostByDefault')
    }
  }
}
</script>
