import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

precacheAndRoute(self.__WB_MANIFEST)

// This clientsClaim() should be at the top level
// of your service worker, not inside of, e.g.,
// an event handler.
clientsClaim()
// https://developer.chrome.com/docs/workbox/modules/workbox-core/

self.skipWaiting()

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})

// I choose https://developer.chrome.com/docs/workbox/the-ways-of-workbox/#workbox-cli
// but we can integrate Workbox another way
// using Webpack build process, thanks to generateSW or injectManifest
// this can be done after this story's validation
