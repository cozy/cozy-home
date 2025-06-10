import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { useSettings } from 'cozy-client'

import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

import AppLike from '@/test/AppLike'
import DefaultRedirectionSnackbar from './DefaultRedirectionSnackbar'
import { useShouldShowDefaultRedirectionSnackbar } from './useShouldShowDefaultRedirectionSnackbar'

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  useQuery: jest.fn(),
  useClient: jest.fn(),
  useSettings: jest.fn()
}))
jest.mock('./useShouldShowDefaultRedirectionSnackbar')
jest.mock('./useIncrementDefaultRedirectionViewCount')

const setup = () => {
  const root = render(
    <AppLike>
      <CozyTheme>
        <DefaultRedirectionSnackbar />
      </CozyTheme>
    </AppLike>
  )
  return { root }
}

describe('DefaultRedirectionSnackbar', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should display default redirection snackbar', () => {
    useShouldShowDefaultRedirectionSnackbar.mockReturnValue(true)
    const mockSaveInstance = jest.fn()
    const mockSaveHome = jest.fn()
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          },
          save: mockSaveInstance
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

    const { root } = setup()

    expect(root.queryByText('OK')).toBeTruthy()
    expect(root.queryByText('No, thank you')).toBeTruthy()
  })

  it('should disable default redirection snackbar and set default redirection to home when accepting', () => {
    useShouldShowDefaultRedirectionSnackbar.mockReturnValue(true)

    const mockSaveInstance = jest.fn()
    const mockSaveHome = jest.fn()
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          },
          save: mockSaveInstance
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

    const { root } = setup()

    fireEvent.click(root.queryByText('OK'))

    expect(mockSaveInstance).toHaveBeenCalledWith({
      default_redirection: 'home/'
    })
    expect(mockSaveHome).toHaveBeenCalledWith({
      default_redirection_snackbar_disabled: true
    })
  })

  it('should disable default redirection snackbar when refusing', () => {
    useShouldShowDefaultRedirectionSnackbar.mockReturnValue(true)

    const mockSaveInstance = jest.fn()
    const mockSaveHome = jest.fn()
    useSettings.mockImplementation((...args) => {
      if (args[0] === 'instance') {
        return {
          values: {
            default_redirection: 'drive/#/folder'
          },
          save: mockSaveInstance
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

    const { root } = setup()

    fireEvent.click(root.queryByText('No, thank you'))

    expect(mockSaveHome).toHaveBeenCalledWith({
      default_redirection_snackbar_disabled: true
    })
    expect(mockSaveInstance).not.toHaveBeenCalled()
  })
})
