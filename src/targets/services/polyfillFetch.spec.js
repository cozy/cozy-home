/**
 * @jest-environment node
 */

import polyfillFetch from './polyfillFetch'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { URL } from 'url'

describe('polyfillFetch', () => {
  // In order to deal with node 16 / node 20 migration
  it('Should use global if exist or fallback to polyfill', () => {
    let shouldCheckFetchPolyfill = false
    let shouldCheckHeadersPolyfill = false
    let shouldCheckResponsePolyfill = false
    let shouldCheckRequestPolyfill = false
    let shouldCheckFormDataPolyfill = false
    let shouldCheckURLPolyfill = false

    if (!global.fetch) shouldCheckFetchPolyfill = true
    if (!global.Headers) shouldCheckHeadersPolyfill = true
    if (!global.Response) shouldCheckResponsePolyfill = true
    if (!global.Request) shouldCheckRequestPolyfill = true
    if (!global.FormData) shouldCheckFormDataPolyfill = true
    if (!global.URL) shouldCheckURLPolyfill = true

    polyfillFetch()
    expect(global.fetch).toBe(shouldCheckFetchPolyfill ? fetch : global.fetch)
    expect(global.Headers).toBe(
      shouldCheckHeadersPolyfill ? fetch.Headers : global.Headers
    )
    expect(global.Response).toBe(
      shouldCheckResponsePolyfill ? fetch.Response : global.Response
    )
    expect(global.Request).toBe(
      shouldCheckRequestPolyfill ? fetch.Request : global.Request
    )
    expect(global.FormData).toBe(
      shouldCheckFormDataPolyfill ? FormData : global.FormData
    )
    expect(global.URL).toBe(shouldCheckURLPolyfill ? URL : global.URL)
  })

  it('should use polyfill if global.fetch is not defined', () => {
    Object.defineProperty(global, 'fetch', {
      writable: true
    })
    global.fetch = undefined
    polyfillFetch()
    expect(global.fetch).toBe(fetch)
  })
})
