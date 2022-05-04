'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import {
  ReactMarkdownWrapper,
  reactMarkdownRendererOptions
} from 'components/ReactMarkdownWrapper'

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
