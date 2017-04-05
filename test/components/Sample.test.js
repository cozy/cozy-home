/* global test, expect */
'use strict'

import React from 'react'
import renderer from 'react-test-renderer'

const Dummy = () => <p>Hello world</p>

test('Hello world', () => {
  const component = renderer.create(
    <Dummy />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
