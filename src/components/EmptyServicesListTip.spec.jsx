import React from 'react'
import { shallow } from 'enzyme'
import { EmptyServicesListTip } from './EmptyServicesListTip'
import { tMock } from '../../test/jestLib/I18n'

describe('EmptyServicesListTip', () => {
  it('should math the snapshot', () => {
    const component = shallow(<EmptyServicesListTip t={tMock} />)
    expect(component.getElement()).toMatchSnapshot()
  })
})
