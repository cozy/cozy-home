import React from 'react'
import { isFlagshipApp } from 'cozy-device-helper'
import { render } from '@testing-library/react'
import App from '../components/AnimatedWrapper'
import AppLike from 'test/AppLike'

jest.mock('lib/redux-cozy-client/connect.jsx')
jest.mock('lib/redux-cozy-client', () => ({
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
          }),
          getQueryFromState: jest.fn
        }
      })
  }
}))

jest.mock('cozy-device-helper', () => ({
  isFlagshipApp: jest.fn(),
  isAndroidApp: jest.fn(),
  isIOS: jest.fn()
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

jest.mock('cozy-device-helper', () => ({
  isFlagshipApp: jest.fn(),
  getFlagshipMetadata: jest.fn().mockReturnValue({
    immersive: jest.fn()
  }),
  isAndroidApp: jest.fn(),
  isIOS: jest.fn()
}))

describe('App', () => {
  it('should keep backgroundImage fixed on Flagship app scroll', () => {
    // Given
    isFlagshipApp.mockReturnValue(true)

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
    ).toEqual('position: fixed; height: 100%;')
  })

  it(`should not keep backgroundImage fixed on mobile's browser scroll`, () => {
    // Given
    isFlagshipApp.mockReturnValue(false)

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
    ).toBeNull()
  })
})
