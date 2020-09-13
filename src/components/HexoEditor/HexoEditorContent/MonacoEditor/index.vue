<template>
  <div>
    <div ref="monaco-editor" class="fit"></div>
    <context-menu :bus="bus" v-model="openContextMenu"></context-menu>
  </div>
</template>
<script>
// import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
// import 'monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget.js'
// import 'monaco-editor/esm/vs/editor/browser/widget/diffEditorWidget.js'
// import 'monaco-editor/esm/vs/editor/browser/widget/diffNavigator.js'

// import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js'
// import 'monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations.js'
// import 'monaco-editor/esm/vs/editor/contrib/caretOperations/transpose.js'
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js'
// import 'monaco-editor/esm/vs/editor/contrib/codelens/codelensController.js'
// import 'monaco-editor/esm/vs/editor/contrib/colorPicker/colorDetector.js'
// import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js'
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js'
// import 'monaco-editor/esm/vs/editor/contrib/cursorUndo/cursorUndo.js'
import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js'
// import 'monaco-editor/esm/vs/editor/contrib/folding/folding.js'
// import 'monaco-editor/esm/vs/editor/contrib/format/formatActions.js'
// import 'monaco-editor/esm/vs/editor/contrib/gotoError/gotoError.js'
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js'
import 'monaco-editor/esm/vs/editor/contrib/inPlaceReplace/inPlaceReplace.js'
import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js'
import 'monaco-editor/esm/vs/editor/contrib/links/links.js'
// import 'monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.js'
// import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js'
// import 'monaco-editor/esm/vs/editor/contrib/smartSelect/smartSelect.js'
// import 'monaco-editor/esm/vs/editor/contrib/snippet/snippetController2.js'
// import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js'
// import 'monaco-editor/esm/vs/editor/contrib/toggleTabFocusMode/toggleTabFocusMode.js'
// import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js'

// import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js'
// import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js'
// import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js'
// import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickOutline.js'
// import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js'
// import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickCommand.js'
// import 'monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js'

import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js'
import 'monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter.js'
// import 'monaco-editor/esm/vs/base/browser/ui/codiconLabel/codiconLabel.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution'
// import 'monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution'
import myTheme from './theme'
import * as MonacoMarkdown from 'monaco-markdown'
import { EditorActionType } from './utils'
import ContextMenu from './ContextMenu'
export default {
  name: 'MonacoEditor',
  props: {
    value: {
      type: String
    },
    position: {
      type: Number,
      default: 0
    },
    bus: {
      type: Object,
      required: true
    }
  },
  components: {
    ContextMenu
  },
  data () {
    return {
      openContextMenu: false
    }
  },
  watch: {
    value (v) {
      if (this.editor.getValue() !== v) { this.editor.setValue(v) }
    }
  },
  mounted () {
    const dom = this.$refs['monaco-editor']
    monaco.editor.defineTheme('myTheme', myTheme)
    monaco.editor.setTheme('myTheme')

    const editorOptions = {
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
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      renderLineHighlight: 'none',
      scrollbar: {
        vertical: 'auto',
        horizontal: 'hidden',
        verticalScrollbarSize: 10,
        useShadows: true
      },
      fontSize: 12,
      lineHeight: 18,
      wordWrap: 'on',
      lineNumbers: 'off',
      cursorBlinking: 'smooth',
      fontFamily: 'Menlo,Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace',
      contextmenu: false // 反正也很少用，关掉避免出现概率为30%的误操作bug：打开右键菜单后会立即执行鼠标指针所在的操作。
    }
    this.editor = monaco.editor.create(dom, editorOptions)

    this.editor.addAction({
      // An unique identifier of the contributed action.
      id: 'winwin.save',

      // A label of the action that will be presented to the user.
      label: 'Save file',

      // An optional array of keybindings for the action.
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],

      // A precondition for this action.
      precondition: null,

      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: null,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: (editor) => {
        this.$emit('on-save')
        return null
      }
    })

    this.editor.addAction({
      // An unique identifier of the contributed action.
      id: 'winwin.togglepreview',

      // A label of the action that will be presented to the user.
      label: 'Toggle Preview',

      // An optional array of keybindings for the action.
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_V],

      // A precondition for this action.
      precondition: null,

      // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
      keybindingContext: null,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convinience
      run: (editor) => {
        this.$emit('on-toggle-preview')
        return null
      }
    })
    const extension = new MonacoMarkdown.MonacoMarkdownExtension()
    extension.activate(this.editor)

    // 以下属于黑魔法
    // const contextmenu = this.editor.getContribution('editor.contrib.contextmenu')
    // const realMethod = contextmenu._onContextMenu
    // contextmenu._onContextMenu = function () {
    //   console.log(contextmenu._contextViewService.contextView.view)
    //   realMethod.apply(contextmenu, arguments)
    // }

    this.editor.onMouseDown(() => {
      this.openContextMenu = false
    })

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue()
      if (this.value !== value) {
        this.$emit('input', value)
      }
    })

    this.lastScrollTop = 0
    this.editor.onDidScrollChange(e => {
      const isScrollDown = this.lastScrollTop < e.scrollTop
      // this.editor.revealLine(0)
      // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html#ondidscrollchange
      if (isScrollDown) {
        this.$emit('on-scroll-down', e)
      } else {
        this.$emit('on-scroll-up', e)
      }
      if (e.scrollTop === 0) {
        this.$emit('on-scroll-top')
      }
      this.$emit('on-scroll', e)
      this.lastScrollTop = e.scrollTop
    })
    this.timer = window.setInterval(() => {
      this.editor.layout()
    }, 100)
    const editor = this.editor
    Object.keys(EditorActionType).map(key => {
      this.bus.$on(EditorActionType[key], _ => {
        console.log(EditorActionType[key])
        editor.trigger('source', EditorActionType[key])
      })
    })
  },
  beforeDestroy () {
    this.editor.dispose()
    window.clearInterval(this.timer)
    Object.keys(EditorActionType).map(key => {
      this.bus.$off(key)
    })
  }
}
</script>
