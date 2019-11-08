'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { Services } from '../../src/components/Services'
import { tMock } from '../jestLib/I18n'

describe('Services component', () => {
  it('should display a list of services', () => {
    const installedKonnectors = [
      { slug: 'test1' },
      { slug: 'test2' },
      { slug: 'test3' }
    ]
    const component = shallow(
      <Services
        t={tMock}
        installedKonnectors={installedKonnectors}
        client={{}}
      />
    )
    expect(component.getElement()).toMatchSnapshot()
  })

  it('should display the empty component when there are no services', () => {
    const installedKonnectors = []
    const component = shallow(
      <Services
        t={tMock}
        installedKonnectors={installedKonnectors}
        client={{}}
      />
    )
    expect(component.getElement()).toMatchSnapshot()
  })
})
