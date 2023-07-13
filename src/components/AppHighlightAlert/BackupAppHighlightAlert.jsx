import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react'

import AppHighlightAlert from 'components/AppHighlightAlert/AppHighlightAlert'

const BackupAppHighlightAlert = ({ apps }) => {
  const { t } = useI18n()

  const onClose = () => {}

  return (
    <AppHighlightAlert
      apps={apps}
      appToHighlightSlug="photos"
      onClose={onClose}
      description={t('backup.appHighlightAlert.description')}
    />
  )
}

export default BackupAppHighlightAlert
