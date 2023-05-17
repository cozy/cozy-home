import React from 'react'

import { Button } from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'

export const LogoutDialog = (props: {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}): JSX.Element => {
  const { t } = useI18n()

  return (
    <CozyTheme variant="normal" className={'u-pos-absolute'}>
      <ConfirmDialog
        actions={
          <>
            <Button
              theme="secondary"
              label={t('logout_dialog.cancel')}
              onClick={props.onCancel}
            />
            <Button
              theme="primary"
              label={t('logout_dialog.confirm')}
              onClick={props.onConfirm}
            />
          </>
        }
        content={t('logout_dialog.content')}
        onClose={props.onCancel}
        open={props.open}
        title={t('logout_dialog.title')}
      />
    </CozyTheme>
  )
}
