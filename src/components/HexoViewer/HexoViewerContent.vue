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
      this.$router.push({
        name: 'edit_article',
        params: {
          id: this.$route.params.id
        }
      })
    },
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>
