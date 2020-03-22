<template>
  <div
    class="col column flex-center bg-blue-1"
    style="user-select:none"
    v-if="editorUiState.unselect"
    @dblclick="addPostByDefault"
  >
    <h2>
      {{empty?'':'选择或'}}新建一篇文章
    </h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { hexoEditorCore } from '../stores/editorStore'
import { editorUiState } from '../stores/editorUiStore'
export default {
  name: 'HexoWelcome',
  data () {
    return {
      editorUiState: editorUiState.state
    }
  },
  computed: {
    ...mapState({
      post: state => state.hexo.post,
      editing: state => state.hexo.editing,
      empty: state => !Object.keys(state.hexo.posts).length
    })
  },
  methods: {
    async addPostByDefault () {
      await hexoEditorCore.addPostByDefault()
    }
  }
}
</script>
