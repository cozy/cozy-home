import React from 'react'
import homeConfig from 'config/home.json'
import { useOpenApp } from 'hooks/useOpenApp'

import App from 'containers/App'
const AnimatedWrapper = () => {
  const { getAppState } = useOpenApp()
  return (
    <div
      className={`App ${getAppState} u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center`}
      style={{
        position: 'fixed',
        height: '100%'
      }}
    >
      <App {...homeConfig} />
    </div>
  )
}

export default AnimatedWrapper
