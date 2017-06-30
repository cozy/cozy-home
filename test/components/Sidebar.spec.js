'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { Sidebar } from '../../src/components/Sidebar'

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
      <Sidebar t={tMock} categories={categoriesMock} router={routerMock} />
    ).node
    expect(component).toMatchSnapshot()
  })

  it('should be displayed correctly in categories view', () => {
    const categoryRouter = Object.assign({}, routerMock, {
      location: {pathname: '/category/'}
    })
    const component = shallow(
      <Sidebar t={tMock} categories={categoriesMock} router={categoryRouter} />
    ).node
    expect(component).toMatchSnapshot()
  })
})
