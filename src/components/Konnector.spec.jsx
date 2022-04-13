import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render } from '@testing-library/react'

import { Konnector } from './Konnector'

jest.mock('cozy-harvest-lib', () => ({
  Routes: ({ konnector, triggers, onDismiss }) => (
    <div konnector={konnector} triggers={triggers} onClick={onDismiss}>
      {konnector.slug}
    </div>
  )
}))

it('it correctly goes back to the home page onDismiss and allows nav goBack', () => {
  const history = createMemoryHistory()

  const { getByText } = render(
    <Router history={history} initialEntries={['/connected']}>
      <Konnector history={history} konnector={{ slug: 'alan' }} />
    </Router>
  )

  history.push('connected/alan/accounts/123')

  fireEvent.click(getByText('alan'))

  expect(history.location.pathname).toBe('/connected')

  history.go(-1)

  expect(history.location.pathname).toBe('/connected/alan/accounts/123')
})
