<template>
    <markdown-previewer
      class="fit"
      :title="post.title"
      :content="post._content"
      @on-edit="editPostById"
    ></markdown-previewer>
</template>

<script>
import { date } from 'quasar'
import { mapState } from 'vuex'
import MarkdownPreviewer from 'components/MarkdownPreviewer'
import * as actionTypes from 'src/store/dispatcher/action-types'
export default {
  name: 'HexoPostViewer',
  components: {
    MarkdownPreviewer
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
