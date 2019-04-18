'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { Loading } from '../../src/components/Loading'

describe('Loading component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed with initial text if loadingType is initial', () => {
    const component = shallow(
      <Loading t={tMock} loadingType="initial" />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should be displayed with working text if loadingType is working', () => {
    const component = shallow(
      <Loading t={tMock} loadingType="working" />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should be displayed with --no-margin class if noMargin is true', () => {
    const component = shallow(<Loading t={tMock} noMargin />).getElement()
    expect(component).toMatchSnapshot()
  })
})
