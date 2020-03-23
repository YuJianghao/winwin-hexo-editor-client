<template>
  <div
    class="col column"
    v-if="editorUiStore.editing"
  >
    <div style="height:42px;max-width:100%">
      <q-input
        borderless
        :value="state.post.title"
        style="height:42px;overflow-y:hidden"
        input-class="text-left q-pa-none bg-grey-2"
        input-style="font-size:1.2rem;text-indent:1rem;font-weight:lighter;"
        @input="updateTitle"
      >
      </q-input>
    </div>
    <monaco-editor
      style="flex:1;height:0;max-width:100%"
      :value="state.post._content"
      @input="updateContent"
      @on-save="savePost"
    ></monaco-editor>
  </div>
</template>

<script>
// import { Editor } from './VueTuiEditor/index'
import MonacoEditor from './MonacoEditor'
import { editorUiStore } from '../stores/editorUiStore'
import { hexoEditorCore } from '../stores/editorStore'
import * as editorDispatcher from '../stores/editorDispatcher'
export default {
  name: 'HexoEditor',
  components: {
    MonacoEditor
  },
  data () {
    return {
      state: hexoEditorCore.state,
      editorUiStore: editorUiStore.state
    }
  },
  methods: {
    updateTitle (e) {
      editorDispatcher.setPostByTitle(e)
    },
    updateContent (e) {
      editorDispatcher.setPostByContent(e)
    },
    savePost () {
      editorDispatcher.savePost()
    }
  }
}
</script>
<style lang="scss" scoped>
.v-note-wrapper {
  z-index: 0;
}
</style>
