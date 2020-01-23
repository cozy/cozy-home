'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { KonnectorTile } from 'components/KonnectorTile'

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
  t: tMock,
  accountsCount: 2,
  error,
  isInMaintenance,
  userError,
  konnector,
  route: `/${konnector.slug}`
})

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
    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display correct status if update', () => {
    const mockProps = getMockProps(
      null,
      null,
      Object.assign({}, mockKonnector, { available_version: '5.0.0' })
    )

    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display correct status if update even if user error', () => {
    const mockProps = getMockProps(
      null,
      new Error('Expected test user error'),
      Object.assign({}, mockKonnector, { available_version: '5.0.0' })
    )

    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display correct status if update even if other error', () => {
    const mockProps = getMockProps(
      new Error('Expected test error'),
      null,
      Object.assign({}, mockKonnector, { available_version: '5.0.0' })
    )

    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display correct status if update even if in maintenance', () => {
    const mockProps = getMockProps(
      null,
      null,
      Object.assign({}, mockKonnector, { available_version: '5.0.0' }),
      true
    )

    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display correct status if in maintenance but no update', () => {
    const mockProps = getMockProps(null, null, mockKonnector, true)

    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display correct error status if user error but no update and not in maintenance', () => {
    const mockProps = getMockProps(null, new Error('Expected test user error'))

    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display correct error status if other error but no update and not in maintenance', () => {
    const mockProps = getMockProps(new Error('LOGIN_FAILED'))

    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display correct error status if no accounts and no errors', () => {
    const mockProps = getMockProps()
    mockProps.accountsCount = 0

    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })
})
