<template>
  <div
    class="col"
    v-if="post&&!editing"
    @dblclick="editPost(null)"
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HexoPostViewer',
  computed: {
    ...mapState({
      post: state => state.hexo.post,
      editing: state => state.hexo.editing
    }),
    html () {
      if (!this.post._content) return ''
      return md.render(this.post._content)
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      editPost: 'hexo/editPost'
    }),
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>
