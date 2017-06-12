// customized function to center a popup window
// source https://stackoverflow.com/a/16861050
export function popupCenter (url, title, w, h) {
  /* global screen */
  // Fixes dual-screen position
  //                      Most browsers      Firefox
  var dualScreenLeft = window.screenLeft || screen.left
  var dualScreenTop = window.screenTop || screen.top

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth : screen.width
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight : screen.height

  var left = ((width / 2) - (w / 2)) + dualScreenLeft
  var top = ((height / 2) - (h / 2)) + dualScreenTop
  var newWindow = window.open('', title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
  newWindow.location.href = url

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
  return newWindow
}

export function waitForClosedPopup (popup, origin) {
  return new Promise((resolve, reject) => {
    var cb = function (messageEvent) {
      if (!messageEvent.data) return // data shouldn't be empty
      // if wrong connector oauth window
      if (messageEvent.data.origin !== origin) return
      resolve(messageEvent.data.key)
    }
    window.addEventListener('message', cb)
    // polling to monitor oauth window closing
    ;(function monitorOAuthClosing () {
      if (popup.closed) {
        window.removeEventListener('message', cb)
        reject(new Error('window closed'))
      } else {
        setTimeout(monitorOAuthClosing, 1000)
      }
    })()
  })
}
