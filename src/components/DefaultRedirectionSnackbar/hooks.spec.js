import { renderHook } from '@testing-library/react-hooks'

import { deconstructRedirectLink, hasQueryBeenLoaded } from 'cozy-client'

import { incrementNavAppShowCount } from './helpers'
import { useIncrementNavAppShowCount } from './hooks'

jest.mock('cozy-client')
jest.mock('./helpers')

describe('useIncrementNavAppShowCount', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should increment only 1 time when everything is good', () => {
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

    const { rerender } = renderHook(() => useIncrementNavAppShowCount(instance))

    expect(incrementNavAppShowCount).toHaveBeenCalledTimes(1)

    rerender()

    expect(incrementNavAppShowCount).toHaveBeenCalledTimes(1)
  })

  it('should not increment when query has not been loaded', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder',
          nav_app_show_count: 2
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(false)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    renderHook(() => useIncrementNavAppShowCount(instance))

    expect(incrementNavAppShowCount).not.toHaveBeenCalled()
  })

  it('should not increment when default redirection app is home app', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'home/',
          nav_app_show_count: 2
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'home' })

    renderHook(() => useIncrementNavAppShowCount(instance))

    expect(incrementNavAppShowCount).not.toHaveBeenCalled()
  })

  it('should not increment when show threshold is reached', () => {
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

    renderHook(() => useIncrementNavAppShowCount(instance))

    expect(incrementNavAppShowCount).not.toHaveBeenCalled()
  })

  it('should not increment when default redirection snackbar is disabled', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder',
          default_redirection_snackbar_disabled: true,
          nav_app_show_count: 2
        }
      }
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    renderHook(() => useIncrementNavAppShowCount(instance))

    expect(incrementNavAppShowCount).not.toHaveBeenCalled()
  })
})
