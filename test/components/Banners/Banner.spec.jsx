'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { Banner } from 'components/Banners/Banner'

describe('Banner component', () => {
  it(`Should render correctly without button if no button props provided`, () => {
    const component = shallow(
      <Banner
        title="Basic banner"
        description="Basic banner description here"
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it(`Should render correctly with button if actionButton provided`, () => {
    const component = shallow(
      <Banner
        title="Basic banner"
        description="Basic banner description here"
        actionButton={<button>My CTA</button>}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it(`Should render correctly if isImportant`, () => {
    const component = shallow(
      <Banner
        title="Basic banner"
        description="Basic banner description here"
        buttonLabel="My CTA"
        onButtonClick={jest.fn()}
        isImportant
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
