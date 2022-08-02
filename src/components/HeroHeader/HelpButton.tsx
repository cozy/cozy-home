import React from 'react'

import HelpIcon from 'cozy-ui/transpiled/react/Icons/Help'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import CornerButton from './CornerButton'

const HelpButton = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <CornerButton
      href={t('help_link')}
      icon={HelpIcon}
      label={t('help')}
      rel="noopener noreferrer"
      target="_blank"
    />
  )
}

export default HelpButton
