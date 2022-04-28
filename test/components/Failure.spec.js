import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Failure } from 'components/Failure'
import AppLike from '../AppLike'

describe('Failure component', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('should be displayed with initial text if errorType is initial', () => {
    const root = render(
      <AppLike>
        <Failure errorType="initial" />
      </AppLike>
    )
    expect(
      root.getByText(
        'Something went wrong when fetching your connectors and informations. Please refresh the page.'
      )
    ).toBeTruthy()
  })

  it('should correctly call the reload function on button click', () => {
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() }
    })

    const root = render(
      <AppLike>
        <Failure errorType="initial" />
      </AppLike>
    )
    const btn = root.getByText('Refresh now')
    fireEvent.click(btn)
    expect(window.location.reload.mock.calls.length).toBe(1)
  })
})
