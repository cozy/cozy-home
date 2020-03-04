import React from 'react'
import { useI18n } from 'cozy-ui/react/I18n'
import CornerButton from './CornerButton'

const HelpButton = () => {
  const { t } = useI18n()
  return <CornerButton label={t('help')} href={t('help_link')} icon="help" />
}

export default HelpButton
