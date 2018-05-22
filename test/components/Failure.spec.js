'use strict'

/* eslint-env jest */

import React from 'react'
import { configure, shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { Failure } from '../../src/components/Failure'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Failure component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed with initial text if errorType is initial', () => {
    const component = shallow(
      <Failure t={tMock} errorType="initial" />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should correctly call the reload function on button click', () => {
    window.location.reload = jest.fn()
    const component = shallow(<Failure t={tMock} errorType="initial" />)
    component.find('DefaultButton').simulate('click')
    expect(window.location.reload.mock.calls.length).toBe(1)
    expect(component.getElement()).toMatchSnapshot()
  })
})
