/**
 * @jest-environment node
 */

import polyfillFetch from './polyfillFetch'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { URL } from 'url'

describe('polyfillFetch', () => {
  describe('when fetch and related objects does not exist in global scope', () => {
    it('should use polyfills', () => {
      polyfillFetch()

      expect(global.fetch).toBe(fetch)
      expect(global.Headers).toBe(fetch.Headers)
      expect(global.Response).toBe(fetch.Response)
      expect(global.Request).toBe(fetch.Request)
      expect(global.FormData).toBe(FormData)
      expect(global.URL).toBe(URL)
    })
  })

  describe('when fetch and related objects already exist in global scope', () => {
    beforeEach(() => {
      global.fetch = function() {}
      global.Headers = function() {}
      global.Response = function() {}
      global.Request = function() {}
      global.FormData = function() {}
      global.URL = function() {}
    })

    it('should do nothing', () => {
      polyfillFetch()

      expect(global.fetch).not.toBe(fetch)
      expect(global.Headers).not.toBe(fetch.Headers)
      expect(global.Response).not.toBe(fetch.Response)
      expect(global.Request).not.toBe(fetch.Request)
      expect(global.FormData).not.toBe(FormData)
      expect(global.URL).not.toBe(URL)
    })
  })
})
