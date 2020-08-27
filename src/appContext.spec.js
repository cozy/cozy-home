import 'isomorphic-fetch'
import { setupAppContext } from './appContext'

jest.mock('cozy-client')
jest.mock('lib/redux-cozy-client')
jest.mock('store/configureStore', () => () => ({}))

describe('app context', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('lang', 'fr')
    document.body.innerHTML = `
      <div role="application" data-cozy-token="token" data-cozy-domain="domain">
      </div>
    `
  })
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
