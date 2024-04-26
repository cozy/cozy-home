import { renderHook } from '@testing-library/react-hooks'

import {
  deconstructRedirectLink,
  hasQueryBeenLoaded,
  useSettings
} from 'cozy-client'

import useIncrementDefaultRedirectionViewCount from './useIncrementDefaultRedirectionViewCount'
import useHomeAppOpened from './useHomeAppOpened'

jest.mock('cozy-client')
jest.mock('./useShouldShowDefaultRedirectionSnackbar')
jest.mock('./useHomeAppOpened')

describe('useIncrementDefaultRedirectionViewCount', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should increment by 1', () => {
    const mockSaveHome = jest.fn()
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
            default_redirection_view_count: 1
          },
          save: mockSaveHome
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })
    useHomeAppOpened.mockReturnValue({
      homeJustOpenedOnFlagshipApp: true,
      homeJustQuitOnFlagshipApp: false
    })

    renderHook(() => useIncrementDefaultRedirectionViewCount())

    expect(mockSaveHome).toHaveBeenNthCalledWith(1, {
      default_redirection_view_count: 2
    })
  })

  it('should set view_count to 1 when incrementing if initial value is undefined', () => {
    const mockSaveHome = jest.fn()
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          }
        }
      } else if (args[0] === 'home') {
        return {
          values: {},
          save: mockSaveHome
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })
    useHomeAppOpened.mockReturnValue({
      homeJustOpenedOnFlagshipApp: true,
      homeJustQuitOnFlagshipApp: false
    })

    renderHook(() => useIncrementDefaultRedirectionViewCount())

    expect(mockSaveHome).toHaveBeenNthCalledWith(1, {
      default_redirection_view_count: 1
    })
  })

  it('should increment only 1 time when everything is good', () => {
    const mockSaveHome = jest.fn()
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
          },
          save: mockSaveHome
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })
    useHomeAppOpened.mockReturnValue({
      homeJustOpenedOnFlagshipApp: true,
      homeJustQuitOnFlagshipApp: false
    })

    const { rerender } = renderHook(() =>
      useIncrementDefaultRedirectionViewCount()
    )

    expect(mockSaveHome).toHaveBeenCalledTimes(1)

    rerender()

    expect(mockSaveHome).toHaveBeenCalledTimes(1)
  })

  it('should not increment when query has not been loaded', () => {
    const mockSaveHome = jest.fn()
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
          },
          save: mockSaveHome
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(false)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })
    useHomeAppOpened.mockReturnValue({
      homeJustOpenedOnFlagshipApp: true,
      homeJustQuitOnFlagshipApp: false
    })

    renderHook(() => useIncrementDefaultRedirectionViewCount())

    expect(mockSaveHome).not.toHaveBeenCalled()
  })

  it('should not increment when default redirection app is home app', () => {
    const mockSaveHome = jest.fn()
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
            default_redirection_view_count: 2
          },
          save: mockSaveHome
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'home' })
    useHomeAppOpened.mockReturnValue({
      homeJustOpenedOnFlagshipApp: true,
      homeJustQuitOnFlagshipApp: false
    })

    renderHook(() => useIncrementDefaultRedirectionViewCount())

    expect(mockSaveHome).not.toHaveBeenCalled()
  })

  it('should not increment when show threshold is reached', () => {
    const mockSaveHome = jest.fn()
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
          },
          save: mockSaveHome
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })
    useHomeAppOpened.mockReturnValue({
      homeJustOpenedOnFlagshipApp: true,
      homeJustQuitOnFlagshipApp: false
    })

    renderHook(() => useIncrementDefaultRedirectionViewCount())

    expect(mockSaveHome).not.toHaveBeenCalled()
  })

  it('should not increment when default redirection snackbar is disabled', () => {
    const mockSaveHome = jest.fn()
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
            default_redirection_view_count: 2
          },
          save: mockSaveHome
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })
    useHomeAppOpened.mockReturnValue({
      homeJustOpenedOnFlagshipApp: true,
      homeJustQuitOnFlagshipApp: false
    })

    renderHook(() => useIncrementDefaultRedirectionViewCount())

    expect(mockSaveHome).not.toHaveBeenCalled()
  })

  it('should not increment when home not just opened on flagship app', () => {
    const mockSaveHome = jest.fn()
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
            default_redirection_view_count: 2
          },
          save: mockSaveHome
        }
      }
    })
    hasQueryBeenLoaded.mockReturnValue(true)
    deconstructRedirectLink.mockReturnValue({ slug: 'drive' })
    useHomeAppOpened.mockReturnValue({
      homeJustOpenedOnFlagshipApp: false,
      homeJustQuitOnFlagshipApp: false
    })

    renderHook(() => useIncrementDefaultRedirectionViewCount())

    expect(mockSaveHome).not.toHaveBeenCalled()
  })
})
