/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { AccountLoginForm } from '../../src/components/AccountLoginForm'

describe('AccountLoginForm component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should enable connection button for valid OAuth account', () => {
    const component = shallow(
      <AccountLoginForm
        t={tMock}
        onSubmit={jest.fn()}
        isOAuth
        isValid
        allRequiredFieldsAreFilled
      />
    )
    expect(component.state().submitEnabled).toBe(true)
  })
})
