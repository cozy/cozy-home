import { createRoot } from 'react-dom/client'
import { renderApp } from './renderApp'
import { _main } from './index'

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn()
}))

jest.mock('./renderApp', () => ({
  renderApp: jest.fn()
}))

describe('_main function', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders app when DOMContentLoaded event is fired', () => {
    const container = document.createElement('div')
    container.setAttribute('role', 'application')
    document.body.appendChild(container)

    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      writable: true
    })

    _main()

    expect(createRoot).not.toHaveBeenCalled()
    expect(renderApp).not.toHaveBeenCalled()

    document.dispatchEvent(new Event('DOMContentLoaded'))

    expect(createRoot).toHaveBeenCalledTimes(1)
    expect(createRoot).toHaveBeenCalledWith(container)
    expect(renderApp).toHaveBeenCalledTimes(1)
  })

  it('renders app immediately when DOM content is already loaded', () => {
    const container = document.createElement('div')
    container.setAttribute('role', 'application')
    document.body.appendChild(container)

    Object.defineProperty(document, 'readyState', {
      value: 'complete',
      writable: true
    })

    _main()

    expect(createRoot).toHaveBeenCalledTimes(1)
    expect(createRoot).toHaveBeenCalledWith(container)
    expect(renderApp).toHaveBeenCalledTimes(1)
  })
})
