<template>
  <div
    class="col column flex-center bg-blue-1"
    style="user-select:none"
    v-if="editorUiUnselect"
    @dblclick="addPostByDefault"
  >
    <h2>
      {{state.empty?'':'选择或'}}新建一篇文章
    </h2>
  </div>
</template>

<script>
import { hexoEditorCore } from '../stores/editorStore'
import { mapGetters } from 'vuex'
export default {
  name: 'HexoWelcome',
  data () {
    return {
      state: hexoEditorCore.state
    }
  },
  computed: {
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
