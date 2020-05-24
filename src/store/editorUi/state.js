export default function () {
  return {
    editing: false,
    preview: false,
    full: false,
    message: '',
    loading: {
      show: false,
      pending: false,
      timmer: null
    }
  }
}
