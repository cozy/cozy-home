import React from 'react'
import cx from 'classnames'

import { getFlagshipMetadata } from 'cozy-device-helper'

export const MainView = ({ children }) => {
  const isImmersive = getFlagshipMetadata().immersive

  return (
    <main
      className={cx(
        'main-view u-flex u-flex-column u-flex-content-start u-flex-content-stretch u-w-100 u-pos-relative',
        isImmersive && 'main-view--immersive'
      )}
    >
      {children}
    </main>
  )
}
