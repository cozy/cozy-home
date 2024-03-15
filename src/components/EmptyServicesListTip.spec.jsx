import { render } from '@testing-library/react'
import React from 'react'

import AppLike from 'test/AppLike'

import { EmptyServicesListTip } from './EmptyServicesListTip'

describe('EmptyServicesListTip', () => {
  it('should match the snapshot', () => {
    const root = render(
      <AppLike>
        <EmptyServicesListTip />
      </AppLike>
    )
    expect(root.getByText('Start gathering your data!')).toBeTruthy()
    expect(
      root.getByText(
        'Synchronise your brands with your Cozy to automatically retrieve your data (bills, reimbursements, expenses…)'
      )
    ).toBeTruthy()
  })
})
