import fetch from 'node-fetch'
import FormData from 'form-data'
import { URL } from 'url'

/**
 * Polyfill fetch function and related objects only if the global scope
 * doesn't already expose it
 */
const polyfillFetch = () => {
  if (global) {
    if (!global.fetch) global.fetch = fetch
    if (!global.Headers) global.Headers = fetch.Headers
    if (!global.Response) global.Response = fetch.Response
    if (!global.Request) global.Request = fetch.Request
    if (!global.FormData) global.FormData = FormData
    if (!global.URL) global.URL = URL
  }
}

export default polyfillFetch
