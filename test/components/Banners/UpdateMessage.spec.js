'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../../jestLib/I18n'
import { UpdateMessage } from 'components/Banners/UpdateMessage'

describe('UpdateMessage component', () => {
  it(`Should be render correctly if not blocking update`, () => {
    const component = shallow(<UpdateMessage t={tMock} />)
      .dive()
      .getElement()
    expect(component).toMatchSnapshot()
  })

  it(`Should be render correctly if blocking update`, () => {
    const component = shallow(<UpdateMessage t={tMock} isBlocking />)
      .dive()
      .getElement()
    expect(component).toMatchSnapshot()
  })
})
