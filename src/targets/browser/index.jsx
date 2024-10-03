import { createRoot } from 'react-dom/client'

import flag from 'cozy-flags'

import { renderApp } from './renderApp'

// Uncomment to activate why-did-you-render
// https://github.com/welldone-software/why-did-you-render
// import './wdyr'

const onReady = () => {
  const container = document.querySelector('[role=application]')
  if (!container) throw new Error('No container found')
  const root = createRoot(container)

  renderApp(root)
}

export const _main = () => {
  if (flag('home.override-title')) {
    document.title = flag('home.override-title')
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady)
  } else {
    onReady()
  }
}

if (process.env.NODE_ENV !== 'test') _main()
