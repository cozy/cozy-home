'use strict'

/* eslint-env jest */

import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { tMock } from '../jestLib/I18n'
import { Sidebar } from '../../src/components/Sidebar'

configure({ adapter: new Adapter() })

const routerMock = {
  location: {
    pathname: '/'
  }
}

const categoriesMock = ['isp', 'telecom']

describe('Sidebar component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed correctly in root view', () => {
    const component = shallow(
      <Sidebar
        t={tMock}
        categories={categoriesMock}
        location={routerMock.location}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should be displayed correctly in providers view', () => {
    const categoryRouter = Object.assign({}, routerMock, {
      location: { pathname: '/providers/' }
    })
    const component = shallow(
      <Sidebar
        t={tMock}
        categories={categoriesMock}
        location={categoryRouter.location}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
