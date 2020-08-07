<template>
  <div class="col row" v-if="article">
    <div
      class="col column"
      style="border-right: 1px solid rgba(0, 0, 0, 0.12);"
    >
      <div class="overflow-hidden">
        <q-input
          borderless
          :value="article.title"
          :style="`max-width:100%;border-bottom: 1px solid rgba(0, 0, 0, 0.12);`"
          input-class="text-left text-bold q-pa-none"
          :input-style="inputStyle"
          @input="updateTitle"
          class="editor-title"
        >
        </q-input>
      </div>
      <monaco-editor
        class="col"
        style="flex:1;height:0;max-width:100%"
        :value="article._content"
        @input="updateContent"
        @on-save="saveArticle"
        @on-toggle-preview="togglePreview"
      ></monaco-editor>
    </div>
    <editor-meta
      class="col"
      style="flex:0 0 300px"
      :article="article"
      @on-fm-update="updateFm"
      @on-tag-update="updateTag"
      @on-category-update="updateCategory"
      @on-date-update="updateDate"
      @on-updated-update="updateUpdated"
    ></editor-meta>
  </div>
  <div v-else>
    Internal Error: article is required
  </div>
</template>

<script>
import MonacoEditor from './MonacoEditor'
import EditorMeta from './EditorMeta'
export default {
  name: 'HexoEditor',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {
    MonacoEditor,
    EditorMeta
  },
  data () {
    return {
      height: 42,
      scrollEventEnable: true
    }
  },
  computed: {
    inputStyle () {
      return {
        'font-size': this.titleSize + 'rem',
        'text-indent': '10px'
      }
    },
    titleSize () {
      const size = this.height / 66
      return size > 1 ? size : 1
    }
  },
  methods: {
    updateTitle (e) {
      const article = Object.assign({}, this.article)
      article.title = e
      this.onUpdate(article)
    },
    updateContent (e) {
      const article = Object.assign({}, this.article)
      article._content = e
      this.onUpdate(article)
    },
    updateFm (e) {
      const article = Object.assign({}, this.article)
      article.frontmatters = e
      this.onUpdate(article)
    },
    updateTag (e) {
      const article = Object.assign({}, this.article)
      article.tags = e
      this.onUpdate(article)
    },
    updateCategory (e) {
      const article = Object.assign({}, this.article)
      article.categories = e
      this.onUpdate(article)
    },
    updateDate (e) {
      const article = Object.assign({}, this.article)
      article.date = e
      this.onUpdate(article)
    },
    updateUpdated (e) {
      const article = Object.assign({}, this.article)
      article.updated = e
      this.onUpdate(article)
    },
    saveArticle () {
      this.$emit('on-save')
    },
    togglePreview (e) {
      this.$emit('on-toggle-preview', e)
    },
    onUpdate (article) {
      this.$emit('on-update', article)
    }
  }
}
</script>
<style lang="scss">
.v-note-wrapper {
  z-index: 0;
}
.editor-title {
  .q-field__control {
    height: 35px;
  }
  .q-field__marginal {
    height: 35px;
  }
}
</style>
