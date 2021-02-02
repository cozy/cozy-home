import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import HelpIcon from 'cozy-ui/transpiled/react/Icons/Help'
import CornerButton from './CornerButton'

const HelpButton = () => {
  const { t } = useI18n()
  return (
    <CornerButton label={t('help')} href={t('help_link')} icon={HelpIcon} />
  )
}

export default HelpButton
