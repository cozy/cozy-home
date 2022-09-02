import React from 'react'
import { render } from '@testing-library/react'

import {
  ReactMarkdownWrapper,
  reactMarkdownRendererOptions
} from 'components/ReactMarkdownWrapper'

describe('ReactMarkdownWrapper component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed correctly if source provided', () => {
    const { container } = render(
      <ReactMarkdownWrapper source={'**test** using `markdown`'} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should be displayed correctly if source with link', () => {
    const { container } = render(
      <ReactMarkdownWrapper
        source={
          '**test** using [markdown](https://en.wikipedia.org/wiki/Markdown)'
        }
      />
    )
    expect(container).toMatchSnapshot()
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
