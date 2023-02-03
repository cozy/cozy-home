import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Navigate, createMemoryRouter, RouterProvider } from 'react-router-dom'

import { StatelessKonnector } from './Konnector'
import { act } from 'react-dom/test-utils'

jest.mock('cozy-harvest-lib', () => ({
  Routes: ({ konnector, triggers, onDismiss }) => (
    <div konnector={konnector} triggers={triggers} onClick={onDismiss}>
      {konnector.slug}
    </div>
  )
}))

const setupMyTest = () => {
  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: <Navigate to="/connected" />
      },
      {
        path: '/connected',
        element: <div>Home</div>
      },
      {
        path: '/connected/:konnectorSlug/*',
        element: <StatelessKonnector slug="alan" konnector={{ slug: 'alan' }} />
      }
    ],
    {
      initialEntries: ['/connected'],
      initialIndex: 0
    }
  )

  render(<RouterProvider router={router} />)

  return { router }
}

it('it correctly goes back to the home page onDismiss and allows nav goBack', () => {
  const { router } = setupMyTest()

  act(() => {
    router.navigate('/connected/alan/accounts/123')
  })

  fireEvent.click(screen.getByText('alan'))

  expect(router.state.location.pathname).toBe('/connected')

  act(() => {
    router.navigate(-1)
  })

  expect(router.state.location.pathname).toBe('/connected/alan/accounts/123')
})
