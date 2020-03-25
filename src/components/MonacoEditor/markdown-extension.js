import * as monaco from 'monaco-editor'
class MarkdownExtension {
  static activate (editor) {
    addKeyBinding(editor, [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B], 'Toggle bold', toggleBlod)
    addKeyBinding(editor, [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_I], 'Toggle italic', toggleItalic)
    addKeyBinding(editor, [monaco.KeyMod.CtrlCmd | monaco.KeyCode.US_BACKTICK], 'Toggle code span', toggleCodeSpan)
  }
}

function addKeyBinding (editor, keybindings, label, fun) {
  editor.addAction({
    // An unique identifier of the contributed action.
    id: 'winwin.' + fun.name,

    // A label of the action that will be presented to the user.
    label: label,

    // An optional array of keybindings for the action.
    keybindings: keybindings,

    // A precondition for this action.
    precondition: null,

    // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
    keybindingContext: null,

    contextMenuGroupId: 'navigation',

    contextMenuOrder: 1.5,

    // Method that will be executed when the action is triggered.
    // @param editor The editor instance is passed in as a convinience
    run: function (editor) {
      fun(editor)
      return null
    }
  })
}

function toggleBlod (editor) {
  toggleWrap(editor, '**')
}

function toggleItalic (editor) {
  toggleWrap(editor, '*')
}

function toggleCodeSpan (editor) {
  toggleWrap(editor, '`')
}

function toggleWrap (editor, start, end = start) {
  console.log(start, end)
  const selections = editor.getSelections()
  const textModel = editor.getModel()
  const ops = selections.map(selection => {
    let restext
    const range = TypeConverters.Range.fromSelection(selection)
    const text = TypeConverters.Value.fromTextModelRange(textModel, range)
    if (isWrap(text, start, end)) {
      restext = text.slice(start.length, text.length - end.length)
    } else {
      restext = start + text + end
    }
    return {
      range: range,
      text: restext
    }
  })
  textModel.pushEditOperations(selections, ops, () => { return null })
}

function isWrap (text, start, end = start) {
  if (text.slice(0, start.length) === start && text.slice(text.length - end.length) === end) return true
  else return false
}

const TypeConverters = {
  Range: {
    fromSelection (selection) {
      return new monaco.Range(
        selection.startLineNumber,
        selection.startColumn,
        selection.endLineNumber,
        selection.endColumn
      )
    }
  },
  Value: {
    fromTextModelRange (textModel, range) {
      return textModel.getValueInRange(range)
    }
  },
  Selection: {
    fromRange (range) {
      return new monaco.Selection(
        range.startLineNumber,
        range.startColumn,
        range.endLineNumber,
        range.endColumn)
    }
  }
}

export default MarkdownExtension
