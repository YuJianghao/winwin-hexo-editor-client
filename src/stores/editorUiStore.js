import { hexoEditorCore } from './editorStore'

// TODO 添加dispatcher，避免代码分散
export const editorUiState = {
  state: {
    post: 'unselect',
    get unselect () {
      return this.post === 'unselect'
    },
    get editing () {
      return this.post === 'editing'
    },
    get viewing () {
      return this.post === 'viewing'
    }
  },
  init () {
    this.state.post = 'unselect'
  },
  editPost () {
    this.state.post = 'editing'
  },
  viewPost () {
    this.state.post = 'viewing'
  },
  closePost () {
    this.state.post = 'unselect'
  },
  deletePost () {
    if (!hexoEditorCore.state.post) { this.closePost() }
  }
}
