'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { DataItem } from '../../src/components/DataItem'

import datatypesToTest from '../../src/config/datatypes'

const hexColorMock = '#297EF2'

describe('DataItem component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  for (const dataType of datatypesToTest) {
    it(`should display correctly the ${dataType} data type`, () => {
      const component = shallow(
        <DataItem t={tMock} dataType={dataType} hex={hexColorMock} />
      ).getElement()
      expect(component).toMatchSnapshot()
    })
  }
})
