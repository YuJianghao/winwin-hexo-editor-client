export function getActions (editor) {
  function getActionsByNamespace (namespace) {
    return editor.getSupportedActions().filter(item => item.id.toLowerCase().indexOf(namespace) >= 0)
  }
  return getActionsByNamespace('.')
}
export class EditorActionType {}

EditorActionType.WINWIN_SAVE = 'winwin.save'
EditorActionType.WINWIN_TOGGLEPREVIEW = 'winwin.togglepreview'
EditorActionType.EDITOR_ACTION_CLIPBOARDCUTACTION = 'editor.action.clipboardCutAction'
EditorActionType.EDITOR_ACTION_CLIPBOARDCOPYACTION = 'editor.action.clipboardCopyAction'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEHEADINGUP = 'markdown.extension.editing.toggleHeadingUp'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEHEADINGDOWN = 'markdown.extension.editing.toggleHeadingDown'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEBOLD = 'markdown.extension.editing.toggleBold'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEITALIC = 'markdown.extension.editing.toggleItalic'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLESTRIKETHROUGH = 'markdown.extension.editing.toggleStrikethrough'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLELIST = 'markdown.extension.editing.toggleList'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLECODESPAN = 'markdown.extension.editing.toggleCodeSpan'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEMATH = 'markdown.extension.editing.toggleMath'
EditorActionType.MARKDOWN_EXTENSION_EDITING_TOGGLEMATHREVERSE = 'markdown.extension.editing.toggleMathReverse'
