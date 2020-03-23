<template>
  <div ref="monaco-editor"></div>
</template>
<script>
import * as monaco from 'monaco-editor'
import myTheme from './theme'
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

    monaco.editor.defineTheme('myTheme', myTheme)
    monaco.editor.setTheme('myTheme')

    this.editor = monaco.editor.create(dom, {
      value: this.value,
      language: 'markdown',
      theme: 'myTheme',
      folding: false,
      readOnly: false,
      roundedSelection: false,
      renderIndentGuides: false,
      minimap: { enabled: false },
      occurrencesHighlight: false,
      wordBasedSuggestions: false,
      highlightActiveIndentGuide: false,
      scrollbar: {
        vertical: 'auto',
        horizontal: 'hidden',
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10
      },
      fontSize: 15,
      lineHeight: 25,
      wordWrap: 'on',
      lineNumbers: 'off',
      cursorBlinking: 'smooth',
      fontFamily: 'Consolas,Roboto, -apple-system, Helvetica Neue, Helvetica, Arial, sans-serif'
    })

    MarkdownExtension.activate(this.editor)

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue()
      if (this.value !== value) {
        this.$emit('input', value)
      }
    })

    this.timer = window.setInterval(() => {
      this.editor.layout()
    }, 100)
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  }
}
</script>
