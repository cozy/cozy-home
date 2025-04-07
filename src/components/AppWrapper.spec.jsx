// eslint-disable-next-line no-unused-vars

import { setupAppContext } from './AppWrapper'
import React from 'react'

const mockClient = {
  registerPlugin: jest.fn(),
  setStore: jest.fn(),
  getInstanceOptions: () => ({
    cozyDefaultWallpaper: 'defaultWallpaper'
  })
}

jest.mock('components/Sections/SectionsContext', () => ({
  SectionsProvider: ({ children }) => children
}))

jest.mock('cozy-client', () => ({
  __esModule: true,
  ...jest.requireActual('cozy-client'),
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

describe('AppWrapper.jsx', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('lang', 'fr')
    document.body.innerHTML = `
      <div role="application" data-cozy='{"domain":"domain","token":"token"}'>
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
})
