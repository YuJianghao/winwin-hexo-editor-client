export default {
  base: 'vs',
  inherit: true,
  rules: [
    {
      foreground: '999999',
      token: 'comment'
    },
    {
      foreground: '999999',
      token: 'string.md'
    },
    { // 链接
      foreground: 'bbbbbb',
      token: 'string.link.md'
    },
    { // 标题
      foreground: '1976ff',
      token: 'keyword'
    },
    {
      foreground: '1976ff',
      fontStyle: 'bold',
      token: 'variable.md'
    }
  ],
  colors: {
    'editor.foreground': '#333333',
    'editor.background': '#ffffff',
    'editorCursor.foreground': '#1976d2',
    'editor.lineHighlightBackground': '#00000005',
    'editor.selectionBackground': '#00000020'
  }
}
