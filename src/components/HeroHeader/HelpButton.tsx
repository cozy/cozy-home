import React from 'react'

import HelpIcon from 'cozy-ui/transpiled/react/Icons/Help'
import { isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import CornerButton from './CornerButton'

const HelpButton = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <CornerButton
      label={t('help')}
      href={t('help_link')}
      icon={HelpIcon}
      {...(isFlagshipApp()
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    />
  )
}

export default HelpButton
