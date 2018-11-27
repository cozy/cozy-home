// customized function to center a popup window
// source https://stackoverflow.com/a/16861050
export function popupCenter(url, title, w, h) {
  /* global screen */
  // Fixes dual-screen position
  //                      Most browsers      Firefox
  var dualScreenLeft = window.screenLeft || screen.left
  var dualScreenTop = window.screenTop || screen.top

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height

  var left = width / 2 - w / 2 + dualScreenLeft
  var top = height / 2 - h / 2 + dualScreenTop
  // need to be set here to get from the OAuth opener
  var newWindow = window.open(
    '',
    title,
    'scrollbars=yes, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )
  newWindow.location.href = url

  // Puts focus on the newWindow
  if (newWindow.focus) {
    newWindow.focus()
  }
  return newWindow
}

export function waitForClosedPopup(popup, accountType) {
  return new Promise((resolve, reject) => {
    var cb = function(messageEvent) {
      if (!messageEvent.data) return // data shouldn't be empty
      // we check the key provided to be sure to handle
      // the correct OAuth popup response here
      var OAuthStateKey = messageEvent.data.OAuthStateKey
      if (OAuthStateKey) {
        var state =
          localStorage.getItem(OAuthStateKey) &&
          JSON.parse(localStorage.getItem(OAuthStateKey))
        if (state.accountType === accountType) {
          localStorage.removeItem(OAuthStateKey)
          resolve(messageEvent.data.key)
        }
      }
    }
    window.addEventListener('message', cb)
    // polling to monitor oauth window closing
    ;(function monitorOAuthClosing() {
      if (popup.closed) {
        window.removeEventListener('message', cb)
        reject(new Error('window closed'))
      } else {
        setTimeout(monitorOAuthClosing, 1000)
      }
    })()
  })
}
