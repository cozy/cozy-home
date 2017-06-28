'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { DescriptionContent } from '../../src/components/DescriptionContent'

describe('DescriptionContent component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed correctly with just title and children', () => {
    const component = shallow(
      <DescriptionContent t={tMock} title='A title mock' children='Test description component children' />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should handle css from props via cssClassesObject', () => {
    const cssClassesObject = { 'col-mock-class': true }
    const component = shallow(
      <DescriptionContent t={tMock} title='A title mock' cssClassesObject={cssClassesObject} />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should be displayed correctly with two messages', () => {
    const messages = ['**First** message `here`', 'second message with [link](https://examplelink.mock)']
    const component = shallow(
      <DescriptionContent t={tMock} title='A title mock' children='Test description component children' messages={messages} />
    ).node
    expect(component).toMatchSnapshot()
  })
})
