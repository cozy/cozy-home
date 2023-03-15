import { deconstructRedirectLink, hasQueryBeenLoaded } from 'cozy-client'

import {
  HOME_DEFAULT_REDIRECTION,
  incrementNavAppShowCount,
  disableDefaultRedirectionSnackbar,
  setDefaultRedirectionToHome,
  shouldShowDefaultRedirectionSnackbar
} from './helpers'

jest.mock('cozy-client')

const client = {
  save: v => v
}

const FOO_BAR_INSTANCE = {
  data: {
    foo: 'foo',
    attributes: {
      bar: 'bar'
    }
  }
}

describe('incrementNavAppShowCount', () => {
  it('should set nav_app_show_count to 1 if previously undefined', async () => {
    const instance = {
      data: {
        attributes: {}
      }
    }

    const { data } = await incrementNavAppShowCount(client, instance)

    expect(data.attributes.nav_app_show_count).toBe(1)
  })

  it('should set nav_app_show_count to 2 if previously 1', async () => {
    const instance = {
      data: {
        attributes: {
          nav_app_show_count: 1
        }
      }
    }

    const { data } = await incrementNavAppShowCount(client, instance)

    expect(data.attributes.nav_app_show_count).toBe(2)
  })

  it('should not erase previous data', async () => {
    const { data } = await incrementNavAppShowCount(client, FOO_BAR_INSTANCE)

    expect(data.foo).toBe(FOO_BAR_INSTANCE.data.foo)
    expect(data.attributes.bar).toBe(FOO_BAR_INSTANCE.data.attributes.bar)
  })
})

describe('disableDefaultRedirectionSnackbar', () => {
  it('should set default_redirection_snackbar_disabled to true', async () => {
    const instance = {
      data: {
        attributes: {}
      }
    }

    const { data } = await disableDefaultRedirectionSnackbar(client, instance)

    expect(data.attributes.default_redirection_snackbar_disabled).toBe(true)
  })

  it('should not erase previous data', async () => {
    const { data } = await incrementNavAppShowCount(client, FOO_BAR_INSTANCE)

    expect(data.foo).toBe(FOO_BAR_INSTANCE.data.foo)
    expect(data.attributes.bar).toBe(FOO_BAR_INSTANCE.data.attributes.bar)
  })
})

describe('setDefaultRedirectionToHome', () => {
  it('should set default_redirection to home', async () => {
    const instance = {
      data: {
        attributes: {}
      }
    }

    const { data } = await setDefaultRedirectionToHome(client, instance)

    expect(data.attributes.default_redirection).toBe(HOME_DEFAULT_REDIRECTION)
  })

  it('should not erase previous data', async () => {
    const { data } = await incrementNavAppShowCount(client, FOO_BAR_INSTANCE)

    expect(data.foo).toBe(FOO_BAR_INSTANCE.data.foo)
    expect(data.attributes.bar).toBe(FOO_BAR_INSTANCE.data.attributes.bar)
  })
})

describe('shouldShowDefaultRedirectionSnackbar', () => {
  it('should return true when everything is good', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder',
          nav_app_show_count: 4
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(true)
  })

  it('should return false when query has not been loaded', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder',
          nav_app_show_count: 4
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(false)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })

  it('should return false when default redirection app is home app', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'home/',
          nav_app_show_count: 4
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'home' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })

  it('should return false when show threshold is not reached', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder',
          nav_app_show_count: 2
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })

  it('should return false when default redirection snackbar is disabled', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder',
          default_redirection_snackbar_disabled: true,
          nav_app_show_count: 4
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      true
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })

  it('should return false when open is false', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder',
          nav_app_show_count: 4
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const showDefaultRedirectionSnackbar = shouldShowDefaultRedirectionSnackbar(
      instance,
      false
    )

    expect(showDefaultRedirectionSnackbar).toBe(false)
  })
})
