<template>
  <div
    class="col column"
    v-if="editorUiStore.editing"
  >
    <div style="height:42px;">
      <q-input
        borderless
        :value="state.post.title"
        input-class="text-left"
        style="height:42px;"
        class="q-ml-md"
        @input="updateTitle"
      >
      </q-input>
    </div>
    <editor
      style="flex:1;height:0;"
      previewStyle="vertical"
      :value="state.post._content"
      :options="options"
      @input="updateContent"
    />
  </div>
</template>

<script>
import { Editor } from './VueTuiEditor/index'
import { editorUiStore } from '../stores/editorUiStore'
import { hexoEditorCore } from '../stores/editorStore'
import * as editorDispatcher from '../stores/editorDispatcher'
export default {
  name: 'HexoEditor',
  components: {
    Editor
  },
  data () {
    return {
      options: {
        minHeight: '200px',
        language: 'zh_CN',
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: true,
        exts: [
          'scrollSync'
        ]
      },
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
    }
  }
}
</script>
<style lang="scss" scoped>
.v-note-wrapper {
  z-index: 0;
}
</style>
