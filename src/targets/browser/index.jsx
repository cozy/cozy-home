import { createRoot } from 'react-dom/client'

import { renderApp } from './renderApp'

const onReady = () => {
  const container = document.querySelector('[role=application]')
  if (!container) throw new Error('No container found')
  const root = createRoot(container)

  renderApp(root)
}

export const _main = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady)
  } else {
    onReady()
  }
}

if (process.env.NODE_ENV !== 'test') _main()
