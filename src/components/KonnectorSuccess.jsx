import styles from '../styles/konnectorSuccess'

import React from 'react'
import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'

export const KonnectorSuccess = props => {
  const {
    t,
    connector,
    isRunningInQueue,
    account,
    error,
    folderId,
    driveUrl,
    title,
    messages,
    onDone,
    successButtonLabel
  } = props
  return (
    account && (
      <div>
        <DescriptionContent
          title={!error && title}
          messages={!error && messages}
        >
          {Array.isArray(connector.data_type) &&
            connector.data_type.includes('bill') && (
              <p>
                {!error &&
                  t(
                    `account.message.${
                      isRunningInQueue ? 'syncing' : 'synced'
                    }.bill`,
                    {
                      name: connector.name
                    }
                  )}
                <br />
                {account.auth.folderPath && (
                  <span
                    className={styles['col-account-folder-highlighted-data']}
                  >
                    {account.auth.folderPath}
                  </span>
                )}
                {driveUrl &&
                  folderId && (
                    <a
                      className={styles['col-account-folder-link']}
                      href={`${driveUrl}${folderId}`}
                    >
                      {t('account.folder.link')}
                    </a>
                  )}
              </p>
            )}
        </DescriptionContent>

        <div className={styles['coz-form-controls']}>
          <div className={styles['col-account-form-success-buttons']}>
            <p>
              <Button
                label={successButtonLabel || t('account.success.button.config')}
                onClick={() => {
                  onDone(account)
                }}
              />
            </p>
          </div>
        </div>
      </div>
    )
  )
}

export default translate()(KonnectorSuccess)
