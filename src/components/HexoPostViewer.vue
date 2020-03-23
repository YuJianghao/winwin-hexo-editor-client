<template>
  <div
    class="col"
    v-if="editorUiStore.viewing"
    @dblclick="editPostById"
  >
    <q-scroll-area class="full-height">
      <div
        class="full-height q-mx-auto q-pa-lg article-entry"
        style="max-width:900px"
      >
        <h1>{{state.post.title}}</h1>
        <sub v-if="state.post.date">{{getDateString(state.post.date)}}</sub>
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
import { editorUiStore } from '../stores/editorUiStore'
import { hexoEditorCore } from '../stores/editorStore'
import * as editorDispatcher from '../stores/editorDispatcher'
export default {
  name: 'HexoPostViewer',
  data () {
    return {
      state: hexoEditorCore.state,
      editorUiStore: editorUiStore.state
    }
  },
  computed: {
    html () {
      if (!this.state.post._content) return ''
      return md.render(this.state.post._content)
    }
  },
  methods: {
    async editPostById () {
      await editorDispatcher.editPostById()
    },
    getDateString (d) {
      return date.formatDate(d, 'YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>
