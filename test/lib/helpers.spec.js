/* eslint-env jest */
import { getAccountName } from '../../src/lib/helpers'

describe('helpers library', () => {
  describe('getAccountName', () => {
    it('should return _id property by default (fallback)', () => {
      const account = { _id: 'mock12345', auth: { token: '1234' } }
      expect(getAccountName(account)).toBe(account._id)
    })
    it('should return _id property by default (fallback) if no auth property', () => {
      const account = { _id: 'mock12345' }
      expect(getAccountName(account)).toBe(account._id)
    })
    it('should return auth.acountName property if it exists, prior to other auth properties', () => {
      const account = { _id: 'mock12345', auth: { accountName: 'myaccount' } }
      expect(getAccountName(account)).toBe(account.auth.accountName)
    })
    it('should return auth.login property if it exists, prior to auth.identifier and auth.email', () => {
      const account = {
        _id: 'mock12345',
        auth: {
          login: 'myaccountlogin',
          identifier: 'myaccountidentifier',
          email: 'myaccount@email.mock'
        }
      }
      expect(getAccountName(account)).toBe(account.auth.login)
    })
    it("should return auth.identifier property if it exists (prior to auth.email) and if auth.login doesn't", () => {
      const account = {
        _id: 'mock12345',
        auth: {
          identifier: 'myaccountidentifier',
          email: 'myaccount@email.mock'
        }
      }
      expect(getAccountName(account)).toBe(account.auth.identifier)
    })
    it('should return auth.email property if it exists and if neither auth.login and neither auth.identifier exist', () => {
      const account = {
        _id: 'mock12345',
        auth: {
          email: 'myaccount@email.mock'
        }
      }
      expect(getAccountName(account)).toBe(account.auth.email)
    })
  })
})
