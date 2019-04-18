'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { AccountPickerItem } from '../../src/components/AccountPickerItem'

const mockAccount = {
  _id: '123456789',
  accountName: 'wawawa youpiyo youpiyai',
  login: 'wawawa@youpiyo.fr'
}

describe('AccountPickerItem component', () => {
  it('should render correctly if success', () => {
    const mockProps = {
      t: tMock,
      hasUpdate: false,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      connection: { isConnected: true }
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should render a spinner if it is running', () => {
    const mockProps = {
      t: tMock,
      hasUpdate: false,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      connection: { isRunning: true }
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display the update message if has update and no errors', () => {
    const mockProps = {
      t: tMock,
      hasUpdate: true,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      connection: {}
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display the update message if has update even if is connected', () => {
    const mockProps = {
      t: tMock,
      hasUpdate: true,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      connection: { isConnected: true }
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display the error if it has error', () => {
    const mockProps = {
      t: tMock,
      hasUpdate: false,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      connection: { hasError: true, error: new Error('Expected test error') }
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display the update if it has update even if it has error', () => {
    const mockProps = {
      t: tMock,
      hasUpdate: true,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      connection: {
        hasError: true,
        error: new Error('Expected test error')
      }
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display maintenance if it is in maintenance', () => {
    const mockProps = {
      t: tMock,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      inMaintenance: true,
      connection: {}
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display maintenance if it is in maintenance even if it has an error', () => {
    const mockProps = {
      t: tMock,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      inMaintenance: true,
      connection: {
        hasError: true,
        error: new Error('Expected test error')
      }
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should display the update message if it has update and is in maintenance even if it has error', () => {
    const mockProps = {
      t: tMock,
      hasUpdate: true,
      konnectorSlug: 'bouilligue',
      account: mockAccount,
      inMaintenance: true,
      connection: {
        hasError: true,
        error: new Error('Expected test error')
      }
    }
    const component = shallow(<AccountPickerItem {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })
})
