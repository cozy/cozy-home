import cx from 'classnames'
import React from 'react'

import { getFlagshipMetadata } from 'cozy-device-helper'
import flag from 'cozy-flags'

import CozyTheme, {
  useCozyTheme
} from 'cozy-ui/transpiled/react/providers/CozyTheme'

import styles from './styles.styl'

import { useWallpaperContext } from 'hooks/useWallpaperContext'
import { AssistantMobile } from 'cozy-dataproxy-lib'

export const AssistantMobileWrapper = () => {
  const { type } = useCozyTheme()

  const {
    data: { isCustomWallpaper }
  } = useWallpaperContext()

  return (
    <CozyTheme variant="normal">
      <div
        className={cx(styles['mobile-assistant'], {
          [styles[`mobile-assistant--${type}`]]: !isCustomWallpaper,
          [styles['mobile-assistant--offset']]: flag('home.fab.button.enabled'),
          [styles['mobile-assistant--immersive']]:
            getFlagshipMetadata().immersive
        })}
      >
        <AssistantMobile isCustomWallpaper={isCustomWallpaper} />
      </div>
    </CozyTheme>
  )
}

export default AssistantMobileWrapper
