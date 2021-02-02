'use strict'

/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'

import { KonnectorTile } from 'components/KonnectorTile'
import AppLike from '../AppLike'

jest.mock(
  'cozy-ui/transpiled/react/Icons/WrenchCircle',
  () =>
    function WrenchCircleIcon() {
      return <span>WrenchCircleIcon</span>
    }
)
jest.mock(
  'cozy-ui/transpiled/react/Icons/WarningCircle',
  () =>
    function WarningCircleIcon() {
      return <span>WarningCircleIcon</span>
    }
)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ children }) => children
}))

const mockKonnector = {
  name: 'Mock',
  slug: 'mock',
  available_version: null
}

const getMockProps = (
  error,
  userError,
  konnector = mockKonnector,
  isInMaintenance = false
) => ({
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
      <KonnectorTile {...mockProps} />
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

  it('should display correct status if update', () => {
    const mockProps = getMockProps(
      null,
      null,
      Object.assign({}, mockKonnector, { available_version: '5.0.0' })
    )

    const root = setup(mockProps)
    expect(root.getByText('Mock')).toBeTruthy()
  })

  it('should display correct status if update even if user error', () => {
    const mockProps = getMockProps(
      null,
      new Error('Expected test user error'),
      Object.assign({}, mockKonnector, { available_version: '5.0.0' })
    )

    const root = setup(mockProps)
    expect(root.getByText('Mock')).toBeTruthy()
  })

  it('should display correct status if update even if other error', () => {
    const mockProps = getMockProps(
      new Error('Expected test error'),
      null,
      Object.assign({}, mockKonnector, { available_version: '5.0.0' })
    )

    const root = setup(mockProps)
    expect(root.getByText('Mock')).toBeTruthy()
  })

  it('should display correct status if update even if in maintenance', () => {
    const mockProps = getMockProps(
      null,
      null,
      Object.assign({}, mockKonnector, { available_version: '5.0.0' }),
      true
    )

    const root = setup(mockProps)
    expect(root.getByText('Mock')).toBeTruthy()
  })

  it('should display correct status if in maintenance but no update', () => {
    const mockProps = getMockProps(null, null, mockKonnector, true)

    const root = setup(mockProps)
    expect(root.getByText('Mock')).toBeTruthy()
    expect(root.getByText('WrenchCircleIcon')).toBeTruthy()
  })

  it('should display correct error status if user error but no update and not in maintenance', () => {
    const mockProps = getMockProps(null, new Error('Expected test user error'))

    const root = setup(mockProps)
    expect(root.getByText('WarningCircleIcon')).toBeTruthy()
    expect(root.getByText('Mock')).toBeTruthy()
  })

  it('should display correct error status if other error but no update and not in maintenance', () => {
    const mockProps = getMockProps(new Error('LOGIN_FAILED'))

    const root = setup(mockProps)
    expect(root.getByText('WarningCircleIcon')).toBeTruthy()
    expect(root.getByText('Mock')).toBeTruthy()
  })

  it('should display correct error status if no accounts and no errors', () => {
    const mockProps = getMockProps()
    mockProps.accountsCount = 0

    const root = setup(mockProps)
    expect(root.getByText('Mock')).toBeTruthy()
  })
})
