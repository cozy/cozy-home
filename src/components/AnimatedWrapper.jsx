import React from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import { isFlagshipApp } from 'cozy-device-helper'

import homeConfig from 'config/home.json'
import App from 'containers/App'
import { useOpenApp } from 'hooks/useOpenApp'

const RemoveScrollOnFlaghsip = ({ children }) => {
  if (isFlagshipApp()) {
    return <RemoveScroll forwardProps>{children}</RemoveScroll>
  }

  return children
}

const AnimatedWrapper = () => {
  const { getAppState } = useOpenApp()

  const mainStyle = isFlagshipApp()
    ? {
        position: 'fixed',
        height: '100%'
      }
    : {}

  return (
    <RemoveScrollOnFlaghsip>
      <div
        className={`App ${getAppState} u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center`}
        style={mainStyle}
      >
        <App {...homeConfig} />
      </div>
    </RemoveScrollOnFlaghsip>
  )
}

export default AnimatedWrapper
