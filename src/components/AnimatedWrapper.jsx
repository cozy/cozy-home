import React from 'react'
import { isFlagshipApp } from 'cozy-device-helper'
import homeConfig from 'config/home.json'
import { useOpenApp } from 'hooks/useOpenApp'
import { RemoveScroll } from 'react-remove-scroll'
import { useWallpaperContext } from 'hooks/useWallpaperContext'
import cx from 'classnames'

import App from 'containers/App'

const RemoveScrollOnFlaghsip = ({ children }) => {
  if (isFlagshipApp()) {
    return <RemoveScroll forwardProps>{children}</RemoveScroll>
  }

  return children
}

const AnimatedWrapper = () => {
  const { getAppState } = useOpenApp()
  const {
    data: { isCustomWallpaper }
  } = useWallpaperContext()

  const mainStyle = isFlagshipApp()
    ? {
        position: 'fixed',
        height: '100%'
      }
    : {}

  return (
    <RemoveScrollOnFlaghsip>
      <div
        className={cx(
          `App u-flex u-flex-column u-w-100 u-miw-100 u-flex-items-center`,
          { [getAppState]: !!getAppState },
          { 'custom-wallpaper': isCustomWallpaper }
        )}
        style={mainStyle}
      >
        <App {...homeConfig} />
      </div>
    </RemoveScrollOnFlaghsip>
  )
}

export default AnimatedWrapper
