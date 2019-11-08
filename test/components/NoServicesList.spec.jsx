'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { NoServicesList } from '../../src/components/NoServicesList'
import { tMock } from '../jestLib/I18n'

describe('NoServicesList component', () => {
  it('should render service suggestions', () => {
    const component = shallow(<NoServicesList t={tMock} />)
    expect(component.getElement()).toMatchSnapshot()
  })
})
