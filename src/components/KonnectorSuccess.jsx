import styles from '../styles/konnectorSuccess'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'

import DescriptionContent from './DescriptionContent'

export const KonnectorSuccess = ({
  t,
  success,
  connector,
  isTimeout,
  folderPath,
  folderId,
  onAccountConfig,
  onCancel,
  driveUrl
}) => {
  return (
    <div>
      <DescriptionContent
        title={t(`account.success.title.${success.type}`, {
          name: connector.name
        })}
        messages={success.messages}
      >
        {Array.isArray(connector.dataType) &&
          connector.dataType.includes('bill') && (
            <p>
              {t(`account.message.${isTimeout ? 'syncing' : 'synced'}.bill`, {
                name: connector.name
              })}
              <br />
              {folderPath && (
                <span
                  className={styles['col-account-success-highlighted-data']}
                >
                  {folderPath}
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
                'coz-btn--secondary',
                styles['coz-btn']
              )}
              onClick={onAccountConfig}
            >
              {t('account.success.button.config')}
            </button>
          </p>
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
}

export default translate()(KonnectorSuccess)
