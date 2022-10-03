import React from 'react'
import { render } from '@testing-library/react'

import { tMock } from '../jestLib/I18n'
import { DescriptionContent } from 'components/DescriptionContent'

describe('DescriptionContent component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed correctly with just title and children', () => {
    const { container } = render(
      <DescriptionContent t={tMock} title="A title mock">
        Test description component children
      </DescriptionContent>
    )
    expect(container).toMatchSnapshot()
  })

  it('should handle css from props via cssClassesObject', () => {
    const cssClassesObject = { 'col-mock-class': true }
    const { container } = render(
      <DescriptionContent
        t={tMock}
        title="A title mock"
        cssClassesObject={cssClassesObject}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('should be displayed correctly with two messages', () => {
    const messages = [
      '**First** message `here`',
      'second message with [link](https://examplelink.mock)'
    ]
    const { container } = render(
      <DescriptionContent t={tMock} title="A title mock" messages={messages}>
        Test description component children
      </DescriptionContent>
    )
    expect(container).toMatchSnapshot()
  })
})
