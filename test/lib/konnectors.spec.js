/* eslint-env jest */
import * as konnectors from '../../src/lib/konnectors'

// TODO: mutualize this code with jobs
// just to tests calling, results are tested in cozy-client-js
const cozyMock = {
  fetchJSON: jest.fn((method, endpoint, data) => Promise.resolve(data))
}

beforeEach(() => {
  // clear mocks calls
  cozyMock.fetchJSON.mockClear()
})

describe('konnectors lib', () => {
  describe('createTrigger', () => {
    const konnector = { slug: 'test' }
    const account = { _id: '963a51f6cdd34401b0904de32cc5578d' }
    const folder = { _id: 'daa147092e1c4a1da8c991cb2a194adc' }

    const options = {
      frequency: 'weekly',
      day: 1,
      hours: 14,
      minutes: 15
    }

    it('creates a trigger', () => {
      expect.assertions(1)
      return konnectors
        .createTrigger(cozyMock, konnector, account, folder, options)
        .then(data => expect(data).toMatchSnapshot())
    })

    it('creates a trigger without folder', () => {
      expect.assertions(1)
      return konnectors
        .createTrigger(cozyMock, konnector, account, null, options)
        .then(data => expect(data).toMatchSnapshot())
    })
  })

  describe('isKonnectorLoginError', () => {
    it('returns true', () => {
      expect(konnectors.isKonnectorLoginError(new Error('LOGIN_FAILED'))).toBe(
        true
      )
    })

    it('returns false', () => {
      expect(konnectors.isKonnectorLoginError(new Error('MAINTENANCE'))).toBe(
        false
      )
    })
  })

  describe('isKonnectorUserError', () => {
    it('returns true for LOGIN_FAILED', () => {
      expect(konnectors.isKonnectorUserError(new Error('LOGIN_FAILED'))).toBe(
        true
      )
    })

    it('returns true for USER_ACTION_NEEDED', () => {
      expect(
        konnectors.isKonnectorUserError(new Error('USER_ACTION_NEEDED'))
      ).toBe(true)
    })

    it('returns false for any other error', () => {
      expect(konnectors.isKonnectorUserError(new Error('UNKNOWN_ERROR'))).toBe(
        false
      )
    })
  })

  describe('isKonnectorKnownError', () => {
    ;[
      'LOGIN_FAILED',
      'MAINTENANCE',
      'NOT_EXISTING_DIRECTORY',
      'USER_ACTION_NEEDED'
    ].forEach(errorType => {
      it(`returns true for ${errorType}`, () => {
        expect(konnectors.isKonnectorKnownError(new Error(errorType))).toBe(
          true
        )
      })
    })

    it('returns false for unknown error', () => {
      expect(
        konnectors.isKonnectorKnownError(new Error('UNEXPECTED_MESSAGE'))
      ).toBe(false)
    })
  })
})
