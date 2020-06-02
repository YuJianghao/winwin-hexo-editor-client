<template>
  <div
    class="col column"
    v-if="show"
  >
    <hexo-post-viewer-bar></hexo-post-viewer-bar>
    <markdown-previewer
      class="col"
      :title="post.title"
      :content="post._content"
      @on-edit="editPostById"
    ></markdown-previewer>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapGetters } from 'vuex'
import MarkdownPreviewer from './MarkdownPreviewer'
import HexoPostViewerBar from './HexoPostViewerBar'
export default {
  name: 'HexoPostViewer',
  components: {
    MarkdownPreviewer,
    HexoPostViewerBar
  },
  computed: {
    show () {
      return this.editorUiViewing
    },
    post () {
      return this.editorCoreData.post
    },
    title () {
      return `# ${this.post.title}\n`
    },
    // externals
    ...mapState({
      editorCoreData: state => state.editorCore.data
    }),
    ...mapGetters({
      editorUiViewing: 'editorUi/viewing',
      editorUiEditing: 'editorUi/editing'
    })
  },
  methods: {
    async editPostById () {
      this.$store.dispatch('editPostById')
    },
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>
