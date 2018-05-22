'use strict'

/* eslint-env jest */

import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  ReactMarkdownWrapper,
  reactMarkdownRendererOptions
} from '../../src/components/ReactMarkdownWrapper'

configure({ adapter: new Adapter() })

describe('ReactMarkdownWrapper component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed correctly if source provided', () => {
    const component = shallow(
      <ReactMarkdownWrapper source={'**test** using `markdown`'} />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should be displayed correctly if source with link', () => {
    const component = shallow(
      <ReactMarkdownWrapper
        source={
          '**test** using [markdown](https://en.wikipedia.org/wiki/Markdown)'
        }
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})

describe('ReactMarkdown options', () => {
  it('should correctly return an anchor HTML element', () => {
    expect(
      reactMarkdownRendererOptions.Link({
        href: 'https://testlink.mock',
        children: 'example link test for test'
      })
    ).toMatchSnapshot()
  })
})
