import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)

addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// I choose https://developer.chrome.com/docs/workbox/the-ways-of-workbox/#workbox-cli
// but we can integrate Workbox another way
// using Webpack build process, thanks to generateSW or injectManifest
// this can be done after this story's validation
