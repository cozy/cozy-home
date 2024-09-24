import React from 'react'

import HelpIcon from 'cozy-ui/transpiled/react/Icons/Help'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useInstanceInfo } from 'cozy-client'

import CornerButton from './CornerButton'

const HelpButton = (): JSX.Element | null => {
  const { t } = useI18n()

  const { isLoaded, context } = useInstanceInfo()

  if (!isLoaded) return null

  const link = context.data?.help_link || t('help_link')

  return (
    <CornerButton
      href={link}
      icon={HelpIcon}
      label={t('help')}
      rel="noopener noreferrer"
      target="_blank"
    />
  )
}

export default HelpButton
