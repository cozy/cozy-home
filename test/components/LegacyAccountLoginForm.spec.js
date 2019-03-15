/* eslint-env jest */

import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

import { Button } from 'cozy-ui/react/Button'

import { tMock } from '../jestLib/I18n'
import { AccountLoginForm } from '../../src/components/LegacyAccountLoginForm'

configure({ adapter: new Adapter() })

describe('LegacyAccountLoginForm component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should enable connection button for valid OAuth account', () => {
    const wrapper = shallow(
      <AccountLoginForm t={tMock} onSubmit={jest.fn()} isOAuth />
    )

    const button = wrapper.find(Button)

    expect(button.props().disabled).toBe(false)
  })
})
