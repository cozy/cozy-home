'use strict'

import React from 'react'
import { render } from '@testing-library/react'

import AppLike from '../../../test/AppLike'

import UpdateMessage from 'components/Banners/UpdateMessage'

describe('UpdateMessage component', () => {
  it(`should be render correctly if not blocking update`, () => {
    const root = render(
      <AppLike>
        <UpdateMessage konnector={{}} />
      </AppLike>
    )
    expect(
      root.getByText('An update is available for this service.')
    ).toBeTruthy()
    expect(
      root.getByText(
        'Perform this update to keep fetching your data and to have the latest features'
      )
    ).toBeTruthy()
  })

  it(`should be render correctly if blocking update`, () => {
    const root = render(
      <AppLike>
        <UpdateMessage konnector={{}} isBlocking />
      </AppLike>
    )
    expect(
      root.getByText('An update is available for this service.')
    ).toBeTruthy()
    expect(root.getByText('Update it to keep fetching your data'))
  })
})
