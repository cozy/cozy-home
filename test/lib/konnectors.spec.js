/* eslint-env jest */
import * as konnectors from 'lib/konnectors'
const cozyMock = {
  fetchJSON: jest.fn((method, endpoint, data) => Promise.resolve(data))
}

beforeEach(() => {
  // clear mocks calls
  cozyMock.fetchJSON.mockClear()
})

describe('konnectors lib', () => {
  describe('isKonnectorLoginError', () => {
    it('returns true', () => {
      expect(
        konnectors.isKonnectorLoginError(
          konnectors.buildKonnectorError('LOGIN_FAILED.TOO_MANY_ATTEMPTS')
        )
      ).toBe(true)
    })

    it('returns false', () => {
      expect(
        konnectors.isKonnectorLoginError(
          konnectors.buildKonnectorError('MAINTENANCE')
        )
      ).toBe(false)
    })
  })

  describe('isKonnectorUserError', () => {
    ;[
      'LOGIN_FAILED',
      'USER_ACTION_NEEDED',
      'CHALLENGE_ASKED',
      'DISK_QUOTA_EXCEEDED',
      'NOT_EXISTING_DIRECTORY'
    ].forEach(errorType => {
      it(`returns true for ${errorType}`, () => {
        expect(
          konnectors.isKonnectorUserError(
            konnectors.buildKonnectorError(errorType)
          )
        ).toBe(true)
      })
    })

    it('returns false for any other error', () => {
      expect(
        konnectors.isKonnectorUserError(
          konnectors.buildKonnectorError('VENDOR_DOWN.BANK_DOWN')
        )
      ).toBe(false)
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
        expect(
          konnectors.isKonnectorKnownError(
            konnectors.buildKonnectorError(errorType)
          )
        ).toBe(true)
      })
    })

    it('returns false for unknown error', () => {
      expect(
        konnectors.isKonnectorKnownError(
          konnectors.buildKonnectorError('UNEXPECTED_MESSAGE')
        )
      ).toBe(false)
    })
  })

  describe('buildKonnectorError', () => {
    it('builds an error from a konnector to expected format', () => {
      const error = konnectors.buildKonnectorError('LOGIN_FAILED')
      expect(error).toMatchSnapshot()
      expect(error.type).toBe('LOGIN_FAILED')
      expect(error.code).toBe('LOGIN_FAILED')
    })

    it('builds an complex error from a konnector to expected format', () => {
      const error = konnectors.buildKonnectorError(
        'USER_ACTION_NEEDED.ACCOUNT_REMOVED'
      )
      expect(error).toMatchSnapshot()
      expect(error.type).toBe('USER_ACTION_NEEDED')
      expect(error.code).toBe('USER_ACTION_NEEDED.ACCOUNT_REMOVED')
    })
  })

  describe('getMostAccurateErrorKey', () => {
    it('returns the full key', () => {
      const t = key =>
        key === 'LOGIN_FAILED.RANDOM_REASON' ? 'Translated message' : key

      const error = konnectors.buildKonnectorError('LOGIN_FAILED.RANDOM_REASON')

      expect(konnectors.getMostAccurateErrorKey(t, error)).toBe(
        'LOGIN_FAILED.RANDOM_REASON'
      )
    })

    it('returns first segment', () => {
      const t = key => (key === 'LOGIN_FAILED' ? 'Translated message' : key)

      const error = konnectors.buildKonnectorError(
        'LOGIN_FAILED.RANDOM_REASON.DETAIL'
      )

      expect(konnectors.getMostAccurateErrorKey(t, error)).toBe('LOGIN_FAILED')
    })

    it('returns medium segment', () => {
      const t = key =>
        key === 'LOGIN_FAILED.RANDOM_REASON' ? 'Translated message' : key

      const error = konnectors.buildKonnectorError(
        'LOGIN_FAILED.RANDOM_REASON.DETAIL'
      )

      expect(konnectors.getMostAccurateErrorKey(t, error)).toBe(
        'LOGIN_FAILED.RANDOM_REASON'
      )
    })

    it('handles getKey parameter', () => {
      const t = key =>
        key === 'prefix.LOGIN_FAILED.RANDOM_REASON.suffix'
          ? 'Translated message'
          : key

      const error = konnectors.buildKonnectorError('LOGIN_FAILED.RANDOM_REASON')

      const getKey = key => `prefix.${key}.suffix`

      expect(konnectors.getMostAccurateErrorKey(t, error, getKey)).toBe(
        'prefix.LOGIN_FAILED.RANDOM_REASON.suffix'
      )
    })

    it('returns default key when no match', () => {
      const t = key => key

      const error = konnectors.buildKonnectorError(
        'LOGIN_FAILED.RANDOM_REASON.DETAIL'
      )

      const getKey = key => `prefix.${key}.suffix`

      expect(konnectors.getMostAccurateErrorKey(t, error, getKey)).toBe(
        'prefix.UNKNOWN_ERROR.suffix'
      )
    })

    it('returns default key for totally unexpected error message', () => {
      const t = key => key

      const error = konnectors.buildKonnectorError('exist status 1')
      const getKey = key => `prefix.${key}.suffix`

      expect(konnectors.getMostAccurateErrorKey(t, error, getKey)).toBe(
        'prefix.UNKNOWN_ERROR.suffix'
      )
    })
  })

  describe('getKonnectorMessage', () => {
    it('returns expected declared message', () => {
      const tMock = key => {
        return {
          'mykonnector.messages.foo': 'The terms'
        }[key]
      }

      const konnector = {
        messages: ['foo'],
        slug: 'mykonnector'
      }

      expect(konnectors.getKonnectorMessage(tMock, konnector, 'foo')).toBe(
        'The terms'
      )
    })

    it('does not return undeclared message', () => {
      const tMock = key => {
        return {
          'mykonnector.messages.foo': 'Bar'
        }[key]
      }

      const konnector = {
        slug: 'mykonnector'
      }

      expect(konnectors.getKonnectorMessage(tMock, konnector, 'foo')).toBeNull()
    })

    it('returns legacy message', () => {
      const tMock = key => {
        return {
          'connector.mykonnector.description.foo': 'Bar'
        }[key]
      }

      const konnector = {
        slug: 'mykonnector',
        hasDescriptions: {
          foo: true
        }
      }

      expect(konnectors.getKonnectorMessage(tMock, konnector, 'foo')).toBe(
        'Bar'
      )
    })

    it('returns legacy mapped message', () => {
      // 'terms' is mapped to legacy 'connector'
      const tMock = key => {
        return {
          'connector.mykonnector.description.connector': 'The terms'
        }[key]
      }

      const konnector = {
        slug: 'mykonnector',
        hasDescriptions: {
          connector: true
        }
      }

      expect(konnectors.getKonnectorMessage(tMock, konnector, 'terms')).toBe(
        'The terms'
      )
    })
  })
})
