'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { Services } from './Services'
import { tMock } from '../../test/jestLib/I18n'

jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  getCssVariableValue: () => '#fff'
}))

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
        suggestedKonnectorsQuery={{ data: [] }}
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
        suggestedKonnectorsQuery={{ data: [{ slug: 'suggestion-1' }] }}
        client={{}}
      />
    )
    expect(component.getElement()).toMatchSnapshot()
    const emptyServicesListTip = component
      .children()
      .last()
      .dive()
    expect(emptyServicesListTip.getElement()).toMatchSnapshot()
  })

  it('should show default suggestions when there are no services and no suggestions', () => {
    const component = shallow(
      <Services
        t={tMock}
        installedKonnectors={[]}
        suggestedKonnectorsQuery={{ data: [] }}
        client={{}}
      />
    )
    expect(component.getElement()).toMatchSnapshot()
  })

  it('should display suggestions after installed services', () => {
    const installedKonnectors = [
      { slug: 'test-1' },
      { slug: 'test-2' },
      { slug: 'test-3' }
    ]
    const component = shallow(
      <Services
        t={tMock}
        installedKonnectors={installedKonnectors}
        suggestedKonnectorsQuery={{
          data: [
            { slug: 'suggestion-1' },
            { slug: 'suggestion-2' },
            { slug: 'test-1' }
          ]
        }}
        client={{}}
      />
    )
    expect(component.getElement()).toMatchSnapshot()
  })
})
