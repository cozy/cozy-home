import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

import AppLike from 'test/AppLike'
import DefaultRedirectionSnackbar from './DefaultRedirectionSnackbar'
import {
  shouldShowDefaultRedirectionSnackbar,
  disableDefaultRedirectionSnackbar,
  setDefaultRedirectionToHome
} from './helpers'

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  useQuery: jest.fn(),
  useClient: jest.fn()
}))
jest.mock('./hooks')
jest.mock('./helpers')

const setup = () => {
  const root = render(
    <AppLike>
      <MuiCozyTheme>
        <DefaultRedirectionSnackbar />
      </MuiCozyTheme>
    </AppLike>
  )
  return { root }
}

describe('DefaultRedirectionSnackbar', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should display default redirection snackbar', () => {
    shouldShowDefaultRedirectionSnackbar.mockReturnValue(true)

    const { root } = setup()

    expect(root.queryByText('OK')).toBeTruthy()
    expect(root.queryByText('No, thank you')).toBeTruthy()
  })

  it('should disable default redirection snackbar and set default redirection to home when accepting', () => {
    shouldShowDefaultRedirectionSnackbar.mockReturnValue(true)

    const { root } = setup()

    fireEvent.click(root.queryByText('OK'))

    expect(disableDefaultRedirectionSnackbar).toHaveBeenCalled()
    expect(setDefaultRedirectionToHome).toHaveBeenCalled()
  })

  it('should disable default redirection snackbar when refusing', () => {
    shouldShowDefaultRedirectionSnackbar.mockReturnValue(true)

    const { root } = setup()

    fireEvent.click(root.queryByText('No, thank you'))

    expect(disableDefaultRedirectionSnackbar).toHaveBeenCalled()
    expect(setDefaultRedirectionToHome).not.toHaveBeenCalled()
  })
})
