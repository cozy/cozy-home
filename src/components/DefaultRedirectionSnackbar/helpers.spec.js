import { renderHook } from '@testing-library/react-hooks'

import {
  deconstructRedirectLink,
  hasQueryBeenLoaded,
  useSettings
} from 'cozy-client'

import { useShouldShowDefaultRedirectionSnackbar } from './helpers'

jest.mock('cozy-client')

describe('shouldShowDefaultRedirectionSnackbar', () => {
  it('should return true when everything is good', () => {
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          }
        }
      } else if (args[0] === 'home') {
        return {
          values: {
            default_redirection_view_count: 4
          }
        }
      }
    })

    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const { result } = renderHook(() =>
      useShouldShowDefaultRedirectionSnackbar(true)
    )

    expect(result.current).toBe(true)
  })

  it('should return false when query has not been loaded', () => {
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          }
        }
      } else if (args[0] === 'home') {
        return {
          values: {
            default_redirection_view_count: 4
          }
        }
      }
    })

    hasQueryBeenLoaded.mockReturnValue(false)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const { result } = renderHook(() =>
      useShouldShowDefaultRedirectionSnackbar(true)
    )

    expect(result.current).toBe(false)
  })

  it('should return false when default redirection app is home app', () => {
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'home/'
          }
        }
      } else if (args[0] === 'home') {
        return {
          values: {
            default_redirection_view_count: 4
          }
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'home' })

    const { result } = renderHook(() =>
      useShouldShowDefaultRedirectionSnackbar(true)
    )

    expect(result.current).toBe(false)
  })

  it('should return false when show threshold is not reached', () => {
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          }
        }
      } else if (args[0] === 'home') {
        return {
          values: {
            default_redirection_view_count: 2
          }
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const { result } = renderHook(() =>
      useShouldShowDefaultRedirectionSnackbar(true)
    )

    expect(result.current).toBe(false)
  })

  it('should return false when default redirection snackbar is disabled', () => {
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          }
        }
      } else if (args[0] === 'home') {
        return {
          values: {
            default_redirection_snackbar_disabled: true,
            default_redirection_view_count: 4
          }
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const { result } = renderHook(() =>
      useShouldShowDefaultRedirectionSnackbar(true)
    )

    expect(result.current).toBe(false)
  })

  it('should return false when open is false', () => {
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          }
        }
      } else if (args[0] === 'home') {
        return {
          values: {
            default_redirection_snackbar_disabled: true,
            default_redirection_view_count: 4
          }
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    const { result } = renderHook(() =>
      useShouldShowDefaultRedirectionSnackbar(false)
    )

    expect(result.current).toBe(false)
  })
})
