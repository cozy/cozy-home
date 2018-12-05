'use strict'

/* eslint-env jest */

import React from 'react'
import { configure, shallow } from 'enzyme'
import { tMock } from '../../../../../test/jestLib/I18n'

import { Queue } from './queue'

import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

describe('Queue component', () => {
  const queue = [
    {
      konnector: { slug: 'testk' },
      label: 'Test',
      status: 'done',
      triggerId: '0412d5795e464ead99f5cea2611bbf21'
    },
    {
      konnector: { slug: 'testk2' },
      label: 'Test 2',
      status: 'ongoing',
      triggerId: 'f042dd05b97842c3acfed33253009659'
    }
  ]

  it('should render', () => {
    const component = shallow(
      <Queue queue={queue} visible={false} t={tMock} />
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
