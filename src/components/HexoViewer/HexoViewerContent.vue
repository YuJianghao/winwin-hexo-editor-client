<template>
    <markdown-previewer
    v-if="article"
      class="fit"
      :title="article.title"
      :content="article._content"
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
    title () {
      return `# ${this.article.title}\n`
    },
    // externals
    ...mapState({
      article: state => state.hexoCore.data.article
    })
  },
  methods: {
    async editPostById () {
      this.$store.dispatch(actionTypes.editPostById, { _id: this.$route.query.id })
    },
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>
