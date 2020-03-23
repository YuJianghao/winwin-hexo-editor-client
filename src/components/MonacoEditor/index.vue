<template>
  <div ref="monaco-editor"></div>
</template>
<script>
import * as monaco from 'monaco-editor'
import MarkdownExtension from './markdown-extension'
export default {
  name: 'MonacoEditor',
  props: {
    value: {
      type: String
    }
  },
  watch: {
    value (v) {
      this.editor.setValue(v)
    }
  },
  mounted () {
    const dom = this.$refs['monaco-editor']
    this.editor = monaco.editor.create(dom, {
      lineNumbers: 'off',
      roundedSelection: false,
      readOnly: false,
      // automaticLayout: true,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
      fontFamily: 'Consolas,Roboto, -apple-system, Helvetica Neue, Helvetica, Arial, sans-serif',
      theme: 'github',
      wordWrap: 'on',
      value: this.value,
      language: 'markdown'
    })

    MarkdownExtension.activate(this.editor)
    this.timer = window.setInterval(() => {
      this.editor.layout()
    }, 100)
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  }
}
</script>
