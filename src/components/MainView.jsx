import React from 'react'

import { getFlagshipMetadata } from 'cozy-device-helper'

export const MainView = ({ children }) => {
  const isImmersive = getFlagshipMetadata().immersive

  return (
    <main
      className="main-view u-flex u-flex-column u-flex-content-start u-flex-content-stretch u-w-100 u-pos-relative"
      style={{
        minHeight: isImmersive
          ? 'calc(100vh - var(--flagship-bottom-height) - var(--flagship-top-height))'
          : '100vh'
      }}
    >
      {children}
    </main>
  )
}
