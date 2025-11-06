import React from 'react'

import styles from './Personalization.styl'
import Wallpaper from './Wallpaper'

import { useClient } from 'cozy-client'
import { ThemeSwitcher } from './ThemeSwitcher'

export const PersonalizationModal = ({ isAnimationComplete = false }) => {
  const client = useClient()

  return (
    <div className="u-w-100 u-h-100 u-flex u-flex-column u-flex-items-center u-flex-justify-start u-pos-relative">
      <div
        className={`${styles['personalize-modal-title']} u-flex u-flex-row u-flex-items-center u-flex-justify-end u-m-1`}
      >
        <ThemeSwitcher isAnimationComplete={isAnimationComplete} />
      </div>

      <Wallpaper client={client} />
    </div>
  )
}
