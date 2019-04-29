'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../../jestLib/I18n'
import { ErrorMessage } from 'components/Banners/ErrorMessage'

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

const onForceConnectionMock = () => jest.fn()

describe('ErrorMessage component', () => {
  it(`Should render correctly`, () => {
    const component = shallow(
      <ErrorMessage
        konnector={konnectorMock}
        t={tMock}
        error={errorMock}
        onForceConnection={onForceConnectionMock}
      />
    )
      .dive()
      .getElement()
    expect(component).toMatchSnapshot()
  })

  it(`Should render correctly if two session expired`, () => {
    const component = shallow(
      <ErrorMessage
        konnector={konnectorMock}
        t={tMock}
        error={twoFaExpiredErrorMock}
        onForceConnection={onForceConnectionMock}
      />
    )
      .dive()
      .getElement()
    expect(component).toMatchSnapshot()
  })

  it(`Should render correctly if wrong twofa code error`, () => {
    const component = shallow(
      <ErrorMessage
        konnector={konnectorMock}
        t={tMock}
        error={twoFaWrongErrorMock}
        onForceConnection={onForceConnectionMock}
      />
    )
      .dive()
      .getElement()
    expect(component).toMatchSnapshot()
  })
})
