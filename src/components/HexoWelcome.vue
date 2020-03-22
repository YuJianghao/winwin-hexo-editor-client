<template>
  <div
    class="col column flex-center bg-blue-1"
    style="user-select:none"
    v-if="editorUiStore.unselect"
    @dblclick="addPostByDefault"
  >
    <h2>
      {{state.empty?'':'选择或'}}新建一篇文章
    </h2>
  </div>
</template>

<script>
import { hexoEditorCore } from '../stores/editorStore'
import { editorUiStore } from '../stores/editorUiStore'
export default {
  name: 'HexoWelcome',
  data () {
    return {
      state: hexoEditorCore.state,
      editorUiStore: editorUiStore.state
    }
  },
  methods: {
    async addPostByDefault () {
      await hexoEditorCore.addPostByDefault()
    }
  }
}
</script>
