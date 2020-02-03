import fetch from 'node-fetch'
import FormData from 'form-data'
import { URL } from 'url'

/**
 * Polyfill fetch function and related objects only if the global scope
 * doesn't already expose it
 */
const polyfillFetch = () => {
  if (global) {
    global.fetch = global.fetch || fetch
    global.Headers = global.Headers || fetch.Headers
    global.Response = global.Response || fetch.Response
    global.Request = global.Request || fetch.Request
    global.FormData = global.FormData || FormData
    global.URL = global.URL || URL
  }
}

export default polyfillFetch
