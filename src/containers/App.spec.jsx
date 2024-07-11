import React from 'react'
import { isFlagshipApp } from 'cozy-device-helper'
import { render } from '@testing-library/react'
import App from '../components/AnimatedWrapper'
import AppLike from 'test/AppLike'
import { WallPaperProvider } from 'hooks/useWallpaperContext'
import { act } from 'react-dom/test-utils'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

// eslint-disable-next-line react/display-name
jest.mock('components/HeroHeader', () => () => <div data-testid="HeroHeader" />)

jest.mock('cozy-device-helper', () => ({
  isFlagshipApp: jest.fn(),
  getFlagshipMetadata: jest.fn().mockReturnValue({
    immersive: jest.fn()
  }),
  isAndroidApp: jest.fn(),
  isIOS: jest.fn()
}))

jest.mock('cozy-harvest-lib', () => ({
  Routes: ({ konnector, triggers, onDismiss }) => (
    <div konnector={konnector} triggers={triggers} onClick={onDismiss}>
      {konnector.slug}
    </div>
  )
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line react/display-name
  Routes: jest.fn(),
  // eslint-disable-next-line react/display-name
  withRouter: Component => props => <Component {...props} />
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  // eslint-disable-next-line react/display-name
  withRouter: Component => props => <Component {...props} />
}))

describe('App', () => {
  it('should keep backgroundImage fixed on Flagship app scroll', async () => {
    // Given
    isFlagshipApp.mockReturnValue(true)

    // When
    const { container } = render(
      <AppLike>
        <CozyTheme>
          <WallPaperProvider>
            <App />
          </WallPaperProvider>
        </CozyTheme>
      </AppLike>
    )
    await act(async () => {})
    // Then
    expect(
      container
        .querySelector(
          '.App.u-flex.u-flex-column.u-w-100.u-miw-100.u-flex-items-center'
        )
        .getAttribute('style')
    ).toEqual('position: fixed; height: 100%;')
  })

  it(`should not keep backgroundImage fixed on mobile's browser scroll`, async () => {
    // Given
    isFlagshipApp.mockReturnValue(false)

    // When
    const { container } = render(
      <AppLike>
        <CozyTheme>
          <WallPaperProvider>
            <App />
          </WallPaperProvider>
        </CozyTheme>
      </AppLike>
    )
    await act(async () => {})
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
