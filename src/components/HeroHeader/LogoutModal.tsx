import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from "cozy-ui/transpiled/react/providers/I18n"
import CozyTheme from "cozy-ui/transpiled/react/providers/CozyTheme"

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
              variant="secondary"
              label={t('logout_dialog.cancel')}
              onClick={props.onCancel}
            />
            <Button
              variant="primary"
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
