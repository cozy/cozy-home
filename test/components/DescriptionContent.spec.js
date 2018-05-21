'use strict'

/* eslint-env jest */

import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { tMock } from '../jestLib/I18n'
import { DescriptionContent } from '../../src/components/DescriptionContent'

configure({ adapter: new Adapter() })

describe('DescriptionContent component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed correctly with just title and children', () => {
    const component = shallow(
      <DescriptionContent t={tMock} title="A title mock">
        Test description component children
      </DescriptionContent>
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should handle css from props via cssClassesObject', () => {
    const cssClassesObject = { 'col-mock-class': true }
    const component = shallow(
      <DescriptionContent
        t={tMock}
        title="A title mock"
        cssClassesObject={cssClassesObject}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should be displayed correctly with two messages', () => {
    const messages = [
      '**First** message `here`',
      'second message with [link](https://examplelink.mock)'
    ]
    const component = shallow(
      <DescriptionContent t={tMock} title="A title mock" messages={messages}>
        Test description component children
      </DescriptionContent>
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
