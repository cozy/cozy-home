'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../../jestLib/I18n'
import { ErrorMessage } from 'components/Banners/ErrorMessage'

jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  getCssVariableValue: () => '#fff'
}))

const konnectorMock = {
  slug: 'mocK'
}

const errorMock = {
  type: 'LOGIN_FAILED',
  code: 'LOGIN_FAILED'
}

const twoFaExpiredErrorMock = {
  type: 'USER_ACTION_NEEDED',
  code: 'USER_ACTION_NEEDED.TWOFA_EXPIRED'
}

const twoFaWrongErrorMock = {
  type: 'USER_ACTION_NEEDED',
  code: 'USER_ACTION_NEEDED.WRONG_TWOFA_CODE'
}

const triggerMock = {}

const getComponent = error => {
  return shallow(
    <ErrorMessage
      konnector={konnectorMock}
      t={tMock}
      error={error}
      trigger={triggerMock}
    />
  )
    .shallow()
    .dive()
    .getElement()
}

describe('ErrorMessage component', () => {
  it(`Should render correctly`, () => {
    expect(getComponent(errorMock)).toMatchSnapshot()
  })

  it(`Should render correctly if two fa session expired`, () => {
    expect(getComponent(twoFaExpiredErrorMock)).toMatchSnapshot()
  })

  it(`Should render correctly if wrong twofa code error`, () => {
    expect(getComponent(twoFaWrongErrorMock)).toMatchSnapshot()
  })
})
