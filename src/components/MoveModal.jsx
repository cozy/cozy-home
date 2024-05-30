import React, { useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { IllustrationDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import { useInstanceSettings } from 'hooks/useInstanceSettings'

const importImage = require('assets/images/moved-cozy.svg')

export const MoveModal = () => {
  const client = useClient()
  const { t } = useI18n()
  const { instanceSettings } = useInstanceSettings(client)

  const movedFrom = instanceSettings?.['moved_from']
  const [hasBeenClosed, setClosed] = useState(false)
  const displayModal = Boolean(movedFrom && !hasBeenClosed)

  const closeModal = () => {
    setClosed(true)
    // No await, it is a background request and we don't want to alert the user
    // if it fails as they can't act on that.
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
          <Button onClick={closeModal} label={t('move_modal.button')} />
        </>
      }
    />
  )
}

export default MoveModal
