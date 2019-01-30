'use strict'

/* eslint-env jest */

import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

import KonnectorTile from '../../src/components/KonnectorTile'

configure({ adapter: new Adapter() })

describe('KonnectorTile component', () => {
  it('should render updated mark if it is updated, even if it is in maintenance', () => {
    const mockProps = {
      konnector: { available_version: true },
      inMaintenance: true
    }
    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })
  it('should render maintenance if it is in maintenance without update', () => {
    const mockProps = { inMaintenance: true }
    const component = shallow(<KonnectorTile {...mockProps} />).getElement()
    expect(component).toMatchSnapshot()
  })
})
