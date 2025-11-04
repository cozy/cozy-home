import React from 'react'
import { isFlagshipApp } from 'cozy-device-helper'
import homeConfig from '@/config/home.json'
import { RemoveScroll } from 'react-remove-scroll'

import App from '@/containers/App'

const RemoveScrollOnFlaghsip = ({ children }) => {
  if (isFlagshipApp()) {
    return <RemoveScroll forwardProps>{children}</RemoveScroll>
  }

  return children
}

const AnimatedWrapper = () => {
  const mainStyle = isFlagshipApp()
    ? {
        position: 'fixed',
        height: '100%'
      }
    : {}

  return (
    <RemoveScrollOnFlaghsip>
      <div
        className="App u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center"
        style={mainStyle}
      >
        <App {...homeConfig} />
      </div>
    </RemoveScrollOnFlaghsip>
  )
}

export default AnimatedWrapper
