import { renderHook } from '@testing-library/react-hooks'

import { deconstructRedirectLink, hasQueryBeenLoaded } from 'cozy-client'

import { incrementDefaultRedirectionViewCount } from './helpers'
import { useIncrementDefaultRedirectionViewCount } from './hooks'

jest.mock('cozy-client')
jest.mock('./helpers')

describe('useIncrementDefaultRedirectionViewCount', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should increment only 1 time when everything is good', () => {
    const instance = {
      data: {
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

    const { rerender } = renderHook(() =>
      useIncrementDefaultRedirectionViewCount(instance, homeSettings)
    )

    expect(incrementDefaultRedirectionViewCount).toHaveBeenCalledTimes(1)

    rerender()

    expect(incrementDefaultRedirectionViewCount).toHaveBeenCalledTimes(1)
  })

  it('should not increment when query has not been loaded', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder',
          default_redirection_view_count: 2
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
    hasQueryBeenLoaded.mockReturnValue(false)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    renderHook(() =>
      useIncrementDefaultRedirectionViewCount(instance, homeSettings)
    )

    expect(incrementDefaultRedirectionViewCount).not.toHaveBeenCalled()
  })

  it('should not increment when default redirection app is home app', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'home/'
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
    deconstructRedirectLink.mockReturnValue({ slug: 'home' })

    renderHook(() =>
      useIncrementDefaultRedirectionViewCount(instance, homeSettings)
    )

    expect(incrementDefaultRedirectionViewCount).not.toHaveBeenCalled()
  })

  it('should not increment when show threshold is reached', () => {
    const instance = {
      data: {
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

    renderHook(() =>
      useIncrementDefaultRedirectionViewCount(instance, homeSettings)
    )

    expect(incrementDefaultRedirectionViewCount).not.toHaveBeenCalled()
  })

  it('should not increment when default redirection snackbar is disabled', () => {
    const instance = {
      data: {
        attributes: {
          default_redirection: 'drive/#/folder'
        }
      }
    }
    const homeSettings = {
      data: [
        {
          default_redirection_snackbar_disabled: true,
          default_redirection_view_count: 2
        }
      ]
    }
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })

    renderHook(() =>
      useIncrementDefaultRedirectionViewCount(instance, homeSettings)
    )

    expect(incrementDefaultRedirectionViewCount).not.toHaveBeenCalled()
  })
})
