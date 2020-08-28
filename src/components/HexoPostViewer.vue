<template>
  <div
    class="fit column"
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
import { mapState } from 'vuex'
import MarkdownPreviewer from './MarkdownPreviewer'
import HexoPostViewerBar from './HexoPostViewerBar'
import * as actionTypes from 'src/store/dispatcher/action-types'
export default {
  name: 'HexoPostViewer',
  components: {
    MarkdownPreviewer,
    HexoPostViewerBar
  },
  computed: {
    post () {
      return this.editorCoreData.article
    },
    title () {
      return `# ${this.post.title}\n`
    },
    // externals
    ...mapState({
      editorCoreData: state => state.editorCore.data
    })
  },
  methods: {
    async editPostById () {
      this.$store.dispatch(actionTypes.editPostById)
    },
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>
