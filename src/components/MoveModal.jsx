import React, { useState } from 'react'
import { useI18n } from 'cozy-ui/react/I18n'
import useInstanceSettings from 'hooks/useInstanceSettings'
import { withClient } from 'cozy-client'

import { Button } from 'cozy-ui/transpiled/react/Button'
import { IllustrationDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

const importImage = require('assets/images/moved-cozy.svg')

export const MoveModal = ({ client }) => {
  const { t } = useI18n()
  const { data: instanceSettings } = useInstanceSettings(client)

  const movedFrom = instanceSettings['moved_from']
  const [hasBeenClosed, setClosed] = useState(false)
  const displayModal = movedFrom && !hasBeenClosed

  const closeModal = () => {
    setClosed(true)
    client.getStackClient().fetchJSON('DELETE', '/settings/instance/moved_from')
  }

  return (
    <IllustrationDialog
      open={displayModal}
      onClose={closeModal}
      fullScreen={false}
      title={
        <div className="u-flex u-flex-column u-flex-items-center">
          <img
            className="u-maw-4 u-mb-1"
            alt={t('move_modal.title')}
            src={importImage}
          />
          {t('move_modal.title')}
        </div>
      }
      content={t('move_modal.text', { from: movedFrom })}
      actions={
        <>
          <Button
            theme="primary"
            onClick={closeModal}
            label={t('move_modal.button')}
          />
        </>
      }
    />
  )
}

export default withClient(MoveModal)
