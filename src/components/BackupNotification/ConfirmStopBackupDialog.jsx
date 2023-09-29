import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const ConfirmStopBackupDialog = ({ onClose, onStop }) => {
  const { t } = useI18n()

  return (
    <ConfirmDialog
      open
      onClose={onClose}
      title={t('backup.confirmStopBackupModal.title')}
      componentsProps={{ dialogTitle: { className: 'u-pv-1-half' } }}
      content={
        <Typography variant="body1">
          {t('backup.confirmStopBackupModal.description')}
        </Typography>
      }
      actions={
        <>
          <Button
            variant="secondary"
            label={t('backup.confirmStopBackupModal.cancel')}
            onClick={onClose}
          />
          <Button
            label={t('backup.confirmStopBackupModal.stop')}
            onClick={onStop}
          />
        </>
      }
    />
  )
}

export default ConfirmStopBackupDialog
