<template>
  <div
    class="col column"
    style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
    v-if="show"
  >
    <div style="height:42px;max-width:100%">
      <q-input
        borderless
        :value="post.title"
        style="height:42px;overflow-y:hidden"
        input-class="text-left q-pa-none"
        input-style="font-size:1.2rem;text-indent:10px;"
        @input="updateTitle"
      >
      </q-input>
    </div>
    <monaco-editor
      style="flex:1;height:0;max-width:100%"
      :value="post._content"
      @input="updateContent"
      @on-save="savePost"
      @on-toggle-preview="togglePreview"
    ></monaco-editor>
  </div>
</template>

<script>
import MonacoEditor from './MonacoEditor'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HexoEditor',
  components: {
    MonacoEditor
  },
  computed: {
    show () {
      return this.editorUiEditing
    },
    post () {
      return this.editorCoreData.post
    },
    // externals
    ...mapState({
      editorCoreData: state => state.editorCore.data
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
    // TODO: 放到dispatcher里
    togglePreview () {
      this.$store.commit('editorUi/togglePreview')
    }
  }
}
</script>
<style lang="scss" scoped>
.v-note-wrapper {
  z-index: 0;
}
</style>
