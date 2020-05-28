<template>
  <div
    class="col column"
    style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
    v-if="show"
  >
    <div :style="`height:${height}px;max-width:100%;transition:${duration}ms;`">
      <q-input
        borderless
        :value="post.title"
        :style="`height:${height}px;overflow-y:hidden;transition:${duration}ms;`"
        input-class="text-left q-pa-none"
        :input-style="`font-size:${titleSize}rem;text-indent:10px;transition:${duration}ms;`"
        @input="updateTitle"
        class="title"
      >
      </q-input>
    </div>
    <monaco-editor
      style="flex:1;height:0;max-width:100%"
      :value="post._content"
      @input="updateContent"
      @on-save="savePost"
      @on-toggle-preview="togglePreview"
      @on-scroll-top="onScrollTop"
      @on-scroll-down="onScrollDown"
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
  data () {
    return {
      height: 80,
      duration: 150,
      scrollEventEnable: true
    }
  },
  computed: {
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
      editorCoreData: state => state.editorCore.data
    }),
    ...mapGetters({
      editorUiEditing: 'editorUi/editing'
    })
  },
  methods: {
    onScrollTop () {
      if (!this.scrollEventEnable) return
      this.height = 80
      this.scrollEventEnable = false
      window.setTimeout(() => { this.scrollEventEnable = true }, this.duration)
    },
    onScrollDown () {
      if (!this.scrollEventEnable) return
      this.height = 42
      this.scrollEventEnable = false
      window.setTimeout(() => { this.scrollEventEnable = true }, this.duration)
    },
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
<style lang="scss">
.v-note-wrapper {
  z-index: 0;
}
.title .q-field__inner .q-field__control {
  height: 80px !important;
}
</style>
