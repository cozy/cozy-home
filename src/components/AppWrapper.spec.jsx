// eslint-disable-next-line no-unused-vars
/* global __DEVELOPMENT__ */

import AppWrapper, { setupAppContext } from './AppWrapper'
import { render } from '@testing-library/react'
import React from 'react'
import AppLike from 'test/AppLike'
import { CustomWallPaperProvider } from 'hooks/useCustomWallpaperContext'
import { act } from 'react-dom/test-utils'

const mockClient = {
  registerPlugin: jest.fn(),
  setStore: jest.fn(),
  getInstanceOptions: () => ({
    cozyDefaultWallpaper: 'defaultWallpaper'
  })
}

jest.mock('cozy-client', () => ({
  __esModule: true,
  CozyProvider: ({ children }) => children,
  RealTimeQueries: ({ doctype }) => (
    <div data-testid="RealTimeQueries">{doctype}</div>
  ),
  default: () => mockClient,
  useClient: () => mockClient
}))

jest.mock('store/configureStore', () => () => ({
  store: {
    dispatch: () => jest.fn(),
    getState: () => jest.fn(),
    subscribe: () => jest.fn()
  },
  persistor: { getState: () => jest.fn(), subscribe: () => jest.fn() }
}))
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }) => children
}))
const AddButtonMock = () => <></>
jest.mock('./AddButton/AddButton', () => AddButtonMock)
jest.mock('hooks/usePreferedTheme', () => ({
  usePreferedTheme: jest.fn().mockReturnValue('inverted')
}))

describe('AppWrapper.jsx', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('lang', 'fr')
    document.body.innerHTML = `
      <div role="application" data-cozy-token="token" data-cozy-domain="domain">
      </div>
    `
  })

  describe('app context', () => {
    it('should create a context with the right properties', () => {
      const appContext = setupAppContext()
      expect(appContext).toEqual(
        expect.objectContaining({
          cozyClient: expect.any(Object),
          store: expect.any(Object),
          data: expect.any(Object),
          lang: 'fr',
          context: expect.any(String)
        })
      )
    })
  })

  describe('AppWrapper', () => {
    it('should render children', async () => {
      // Given
      window.__DEVELOPMENT__ = 'defined'
      // act(() => {
      // When
      const { getByText } = render(
        <AppLike>
          <CustomWallPaperProvider>
            <AppWrapper>children</AppWrapper>
          </CustomWallPaperProvider>
        </AppLike>
      )
      await act(async () => {})

      // Then
      expect(getByText('children')).toBeTruthy()
      // })
    })

    it('should contain RealTimeQueries', async () => {
      // Given
      window.__DEVELOPMENT__ = 'defined'

      // When
      const { getAllByTestId } = render(
        <AppWrapper>
          <CustomWallPaperProvider>children </CustomWallPaperProvider>
        </AppWrapper>
      )
      await act(async () => {})
      // Then
      expect(getAllByTestId('RealTimeQueries')).toBeTruthy()
    })
  })
})
