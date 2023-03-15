import { deconstructRedirectLink, hasQueryBeenLoaded } from 'cozy-client'

import {
  HOME_DEFAULT_REDIRECTION,
  incrementDefaultRedirectionViewCount,
  disableDefaultRedirectionSnackbar,
  setDefaultRedirectionToHome,
  shouldShowDefaultRedirectionSnackbar
} from './helpers'

jest.mock('cozy-client')

const client = {
  save: v => v
}

const FOO_INSTANCE = {
  foo: 'foo'
}

const FOO_BAR_INSTANCE = {
  data: {
    foo: 'foo',
    attributes: {
      bar: 'bar'
    }
  }
}

describe('incrementDefaultRedirectionViewCount', () => {
  it('should set default_redirection_view_count to 1 if previously undefined', async () => {
    const homeSettings = {}

    const { default_redirection_view_count } =
      await incrementDefaultRedirectionViewCount(client, homeSettings)

    expect(default_redirection_view_count).toBe(1)
  })

  it('should set default_redirection_view_count to 2 if previously 1', async () => {
    const homeSettings = {
      default_redirection_view_count: 1
    }

    const { default_redirection_view_count } =
      await incrementDefaultRedirectionViewCount(client, homeSettings)

    expect(default_redirection_view_count).toBe(2)
  })

  it('should not erase previous data', async () => {
    const { foo } = await incrementDefaultRedirectionViewCount(
      client,
      FOO_INSTANCE
    )

    expect(foo).toBe(FOO_INSTANCE.foo)
  })
})

describe('disableDefaultRedirectionSnackbar', () => {
  it('should set default_redirection_snackbar_disabled to true', async () => {
    const homeSettingsResult = {
      data: [{}]
    }

    const { default_redirection_snackbar_disabled } =
      await disableDefaultRedirectionSnackbar(client, homeSettingsResult)

    expect(default_redirection_snackbar_disabled).toBe(true)
  })

  it('should not erase previous data', async () => {
    const { foo } = await incrementDefaultRedirectionViewCount(
      client,
      FOO_INSTANCE
    )

    expect(foo).toBe(FOO_INSTANCE.foo)
  })
})

describe('setDefaultRedirectionToHome', () => {
  it('should set default_redirection to home', async () => {
    const instance = {
      data: {
        _id: '_id',
        _type: '_type',
        meta: { rev: 'rev' },
        attributes: {}
      }
    }

    const { data } = await setDefaultRedirectionToHome(client, instance)

    expect(data.attributes.default_redirection).toBe(HOME_DEFAULT_REDIRECTION)
  })

  it('should not erase previous data', async () => {
    const { data } = await incrementDefaultRedirectionViewCount(
      client,
      FOO_BAR_INSTANCE
    )

    expect(data.foo).toBe(FOO_BAR_INSTANCE.data.foo)
    expect(data.attributes.bar).toBe(FOO_BAR_INSTANCE.data.attributes.bar)
  })
})

describe('shouldShowDefaultRedirectionSnackbar', () => {
  it('should return true when everything is good', () => {
    const instance = {
      data: {
        _id: '_id',
        _type: '_type',
        meta: { rev: 'rev' },
        attributes: {
          default_redirection: 'drive/#/folder'
        }
      }
    }
    const homeSettings = {
      data: [
        {
          default_redirection_view_count: 4
        }
      ]
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      homeSettings,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(true)
  })

  it('should return false when query has not been loaded', () => {
    const instance = {
      data: {
        _id: '_id',
        _type: '_type',
        meta: { rev: 'rev' },
        attributes: {
          default_redirection: 'drive/#/folder'
        }
      }
    }
    const homeSettings = {
      data: [
        {
          default_redirection_view_count: 4
        }
      ]
    }
    hasQueryBeenLoaded.mockReturnValue(false)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      homeSettings,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })

  it('should return false when default redirection app is home app', () => {
    const instance = {
      data: {
        _id: '_id',
        _type: '_type',
        meta: { rev: 'rev' },
        attributes: {
          default_redirection: 'home/'
        }
      }
    }
    const homeSettings = {
      data: [
        {
          default_redirection_view_count: 4
        }
      ]
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'home' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      homeSettings,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })

  it('should return false when show threshold is not reached', () => {
    const instance = {
      data: {
        _id: '_id',
        _type: '_type',
        meta: { rev: 'rev' },
        attributes: {
          default_redirection: 'drive/#/folder'
        }
      }
    }
    const homeSettings = {
      data: [
        {
          default_redirection_view_count: 2
        }
      ]
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      homeSettings,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })

  it('should return false when default redirection snackbar is disabled', () => {
    const instance = {
      data: {
        _id: '_id',
        _type: '_type',
        meta: { rev: 'rev' },
        attributes: {
          default_redirection: 'drive/#/folder'
        }
      }
    }
    const homeSettings = {
      data: [
        {
          default_redirection_snackbar_disabled: true,
          default_redirection_view_count: 4
        }
      ]
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      homeSettings,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })

  it('should return false when open is false', () => {
    const instance = {
      data: {
        _id: '_id',
        _type: '_type',
        meta: { rev: 'rev' },
        attributes: {
          default_redirection: 'drive/#/folder',
          default_redirection_view_count: 4
        }
      }
    }
    const homeSettings = {
      data: [
        {
          default_redirection_view_count: 4
        }
      ]
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      homeSettings,
      false
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })
})
