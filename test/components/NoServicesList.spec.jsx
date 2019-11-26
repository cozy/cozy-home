'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { NoServicesList } from '../../src/components/NoServicesList'
import { tMock } from '../jestLib/I18n'

jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  getCssVariableValue: () => '#fff'
}))

describe('NoServicesList component', () => {
  it('should render service suggestions', () => {
    const konnectorSuggestions = {
      data: [{ slug: 'test1' }, { slug: 'test2' }]
    }
    const component = shallow(
      <NoServicesList t={tMock} konnectorSuggestions={konnectorSuggestions} />
    )
    expect(component.getElement()).toMatchSnapshot()
  })
})
