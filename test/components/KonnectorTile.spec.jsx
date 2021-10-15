'use strict'

/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

import {
  KonnectorTile,
  getKonnectorStatus,
  STATUS
} from 'components/KonnectorTile'
import AppLike from '../AppLike'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ children }) => children
}))

const mockKonnector = {
  name: 'Mock',
  slug: 'mock',
  available_version: null
}

const getMockProps = ({
  error,
  userError,
  konnector = mockKonnector,
  isInMaintenance = false
} = {}) => ({
  accountsCount: 2,
  error,
  isInMaintenance,
  userError,
  konnector,
  route: `/${konnector.slug}`
})

const setup = mockProps => {
  return render(
    <AppLike>
      <MuiCozyTheme>
        <KonnectorTile {...mockProps} />
      </MuiCozyTheme>
    </AppLike>
  )
}

describe('KonnectorTile component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error.mockRestore()
  })

  it('should render correctly if success', () => {
    const mockProps = getMockProps()
    const root = setup(mockProps)
    expect(root.getByText('Mock')).toBeTruthy()
  })

  it('should display correct status if in maintenance', () => {
    const status = getKonnectorStatus({
      konnector: mockKonnector,
      isInMaintenance: true
    })
    expect(status).toEqual(STATUS.MAINTENANCE)
  })

  it('should display correct error status if user error but not in maintenance', () => {
    const status = getKonnectorStatus({
      error: null,
      userError: new Error('Expected test user error')
    })
    expect(status).toEqual(STATUS.ERROR)
  })

  it('should display correct error status if other error but not in maintenance', () => {
    const status = getKonnectorStatus({ error: new Error('LOGIN_FAILED') })
    expect(status).toEqual(STATUS.ERROR)
  })

  it('should display correct error status if no accounts and no errors', () => {
    const mockProps = getMockProps()
    mockProps.accountsCount = 0

    const root = setup(mockProps)
    expect(root.getByText('Mock')).toBeTruthy()
  })
})
