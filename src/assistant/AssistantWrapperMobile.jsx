import React from 'react'
import { useNavigate } from 'react-router-dom'
import flag from 'cozy-flags'
import cx from 'classnames'

import { getFlagshipMetadata } from 'cozy-device-helper'
import CozyTheme, {
  useCozyTheme
} from 'cozy-ui/transpiled/react/providers/CozyTheme'
import SearchBar from 'cozy-ui/transpiled/react/SearchBar'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import AssistantIcon from 'assets/images/icon-assistant.png'
import { FLAG_FAB_BUTTON_ENABLED } from 'components/AddButton/helpers'
import { useWallpaperContext } from 'hooks/useWallpaperContext'

import styles from './styles.styl'

export const AssistantWrapperMobile = () => {
  const { type } = useCozyTheme()
  const {
    data: { isCustomWallpaper }
  } = useWallpaperContext()
  const { t } = useI18n()
  const navigate = useNavigate()

  const isAssistantEnabled = flag('cozy.assistant.enabled')

  return (
    <CozyTheme variant="normal">
      <div
        className={cx(styles['assistantWrapper-mobile'], {
          [styles[`assistantWrapper-mobile--${type}`]]: !isCustomWallpaper,
          [styles['assistantWrapper-mobile--offset']]: flag(
            FLAG_FAB_BUTTON_ENABLED
          ),
          [styles['assistantWrapper-mobile--immersive']]:
            getFlagshipMetadata().immersive
        })}
      >
        <SearchBar
          size="medium"
          icon={
            <Icon className="u-ml-1 u-mr-half" icon={AssistantIcon} size={24} />
          }
          type="button"
          label={
            isAssistantEnabled ? t('assistant.search.placeholder') : undefined // Fallback on SearchBar default
          }
          onClick={() => navigate('connected/search')}
        />
      </div>
    </CozyTheme>
  )
}

export default AssistantWrapperMobile
