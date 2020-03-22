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
    if (process.env.DEV)console.log('set editor ui post editing')
    this.state.post = 'editing'
  },
  viewPost () {
    if (process.env.DEV)console.log('set editor ui post viewing')
    this.state.post = 'viewing'
  },
  closePost () {
    if (process.env.DEV)console.log('set editor ui post unselect')
    this.state.post = 'unselect'
  },
  deletePost (_id) {
    if (hexoEditorCore.state.post && hexoEditorCore.state.post._id === _id) { this.closePost() }
  }
}
