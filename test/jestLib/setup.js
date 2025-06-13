import '@testing-library/jest-dom'
import React from 'react'

import log from 'cozy-logger'

log.setLevel('error')

// eslint-disable-next-line no-console
const originalWarn = console.warn
// eslint-disable-next-line no-console
console.warn = function (msg, msg2) {
  if (
    msg &&
    msg.includes &&
    msg.includes('Please update the following components:') &&
    msg2 &&
    msg2 === 'ReactSwipableView'
  ) {
    return
  }
  return originalWarn.apply(this, arguments)
}

jest.mock('cozy-dataproxy-lib', () => ({
  DataProxyProvider: ({ children }) => children
}))

jest.mock('cozy-search', () => ({
  SearchDialog: () => <div>SearchDialog</div>,
  AssistantDialog: () => <div>AssistantDialog</div>,
  AssistantDesktop: () => <div>AssistantDesktop</div>,
  AssistantMobile: () => <div>AssistantMobile</div>
}))
