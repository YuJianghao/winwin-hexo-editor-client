<template>
  <div
    class="col"
    v-if="show"
    @dblclick="editPostById"
  >
    <q-scroll-area class="full-height">
      <div
        class="full-height q-mx-auto q-pa-lg article-entry"
        style="max-width:900px"
      >
        <h1>{{post.title}}</h1>
        <sub v-if="post.date">{{getDateString(post.date)}}</sub>
        <div v-html="html"></div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { date } from 'quasar'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import lineNumber from '../utils/lineNumber'
const md = MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        var html = hljs.highlight(lang, str, true).value
        const count = html.split('\n').length
        html = '<pre class="hljs"><code class="hljs">' + html +
          '</code></pre>'
        // return html
        return '<pre class="area">' + lineNumber(html, count) + '</pre>'
      } catch (__) { }
    }

    return '<pre class="hljs"><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'HexoPostViewer',
  computed: {
    show () {
      return this.editorUiViewing || this.editorUiEditing
    },
    post () {
      return this.editorCoreData.post
    },
    html () {
      if (!this.post._content) return ''
      return md.render(this.post._content)
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
