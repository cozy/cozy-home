import styles from '../styles/konnectorSuccess'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'

export const KonnectorSuccess = ({
  t,
  connector,
  isTimeout,
  account,
  folderId,
  onCancel,
  driveUrl,
  title,
  messages
}) => {
  return (
    account && (
      <div>
        <DescriptionContent title={title} messages={messages}>
          {Array.isArray(connector.dataType) &&
            connector.dataType.includes('bill') && (
              <p>
                {t(`account.message.${isTimeout ? 'syncing' : 'synced'}.bill`, {
                  name: connector.name
                })}
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
              <button
                className={classNames(
                  'coz-btn',
                  'coz-btn--regular',
                  styles['coz-btn']
                )}
                onClick={onCancel}
              >
                {t('account.success.button.back')}
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  )
}

export default translate()(KonnectorSuccess)
