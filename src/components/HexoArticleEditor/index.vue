<template>
  <div
    class="col column"
    v-if="show"
  >
    <hexo-editor-bar></hexo-editor-bar>
    <div class="col row">
      <div
        class="col column"
        style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
      >
        <div class="overflow-hidden"
        >
          <q-input
            borderless
            :value="post.title"
            :style="`max-width:100%;border-bottom: 1px solid rgba(0, 0, 0, 0.12);`"
            input-class="text-left text-bold q-pa-none"
            :input-style="inputStyle"
            @input="updateTitle"
            class="editor-title"
          >
          </q-input>
        </div>
        <monaco-editor
          class="col"
          style="flex:1;height:0;max-width:100%"
          :value="post._content"
          @input="updateContent"
          @on-save="savePost"
          @on-toggle-preview="togglePreview"
        ></monaco-editor>
      </div>
      <editor-meta class="col" style="flex:0 0 300px"></editor-meta>
    </div>
  </div>
</template>

<script>
import MonacoEditor from './MonacoEditor'
import HexoEditorBar from './HexoEditorBar'
import EditorMeta from './EditorMeta'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HexoEditor',
  components: {
    MonacoEditor,
    HexoEditorBar,
    EditorMeta
  },
  data () {
    return {
      height: 42,
      scrollEventEnable: true
    }
  },
  computed: {
    inputStyle () {
      return {
        'font-size': this.titleSize + 'rem',
        'text-indent': '10px'
      }
    },
    preview () {
      return this.editorUi.preview
    },
    titleSize () {
      const size = this.height / 66
      return size > 1 ? size : 1
    },
    show () {
      return this.editorUiEditing
    },
    post () {
      return this.editorCoreData.post
    },
    // externals
    ...mapState({
      editorCoreData: state => state.editorCore.data,
      editorUi: state => state.editorUi
    }),
    ...mapGetters({
      editorUiEditing: 'editorUi/editing'
    })
  },
  methods: {
    updateTitle (e) {
      this.$store.dispatch('setPostByTitle', e)
    },
    updateContent (e) {
      this.$store.dispatch('setPostByContent', e)
    },
    savePost () {
      this.$store.dispatch('savePost')
    },
    togglePreview () {
      this.$store.commit('editorUi/togglePreview')
    }
  }
}
</script>
<style lang="scss">
.v-note-wrapper {
  z-index: 0;
}
.editor-title{
  .q-field__control{
    height:35px;
  }
  .q-field__marginal{
    height:35px;
  }
}
</style>
