export default function () {
  return {
    editing: false,
    preview: false,
    full: false,
    message: '',
    actionbar: {
      height: '36px'
    },
    loading: {
      show: false,
      pending: false,
      timmer: null
    }
  }
}
