/**
 * Force reloading window regardless of "Confirm before reload" setting.
 * This is handy for certain cases, for example Last.fm connect/disconnect.
 */
export const forceReloadWindow = () => {
  if (window.__UNIT_TESTING__) {
    return
  }

  window.onbeforeunload = () => { }
  window.location.reload()
}
