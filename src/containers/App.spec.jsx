import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import AppLike from '../../test/AppLike'

jest.mock('../../src/lib/redux-cozy-client/connect.jsx')
jest.mock('../../src/lib/redux-cozy-client', () => ({
  cozyConnect: () => App => {
    return () =>
      App({
        accounts: [{ fetchStatus: 'failed' }],
        konnectors: [{ fetchStatus: 'failed' }],
        triggers: [{ fetchStatus: 'failed' }],
        client: {
          query: () => {},
          getInstanceOptions: () => ({
            cozyDefaultWallpaper: 'cozyDefaultWallpaper'
          })
        }
      })
  }
}))

// eslint-disable-next-line react/display-name
jest.mock('components/HeroHeader', () => () => <div data-testid="HeroHeader" />)
// jest.mock('components/Home', () => () => <div />)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Route: ({ path, exact }) => (
    <div data-testId="route" data-path={path} data-exact={exact} />
  ),
  Redirect: ({ children }) => <div data-testId="Redirect">{children}</div>,
  Switch: ({ children }) => <div data-testId="Switch">{children}</div>,
  withRouter: children => children
}))

describe('App', () => {
  it('should keep backgroundImage fixed on mobile scroll', () => {
    // Given

    // When
    const { container } = render(
      <AppLike>
        <App />
      </AppLike>
    )

    // Then
    expect(
      container
        .querySelector(
          '.App.u-flex.u-flex-column.u-w-100.u-miw-100.u-flex-items-center'
        )
        .getAttribute('style')
    ).toEqual(
      'background-image: url(cozyDefaultWallpaper); position: fixed; height: 100%;'
    )
  })
})
