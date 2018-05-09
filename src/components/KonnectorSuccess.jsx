import styles from '../styles/konnectorSuccess'

import React from 'react'

import { AsButton } from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'
import { NavLink } from 'react-router-dom'

import DescriptionContent from './DescriptionContent'

export const KonnectorSuccess = ({
  t,
  connector,
  isRunningInQueue,
  onBack,
  account,
  error,
  folderId,
  onCancel,
  onNext,
  driveUrl,
  title,
  messages,
  successButtonLabel
}) => {
  return (
    account && (
      <div>
        <DescriptionContent
          title={!error && title}
          messages={!error && messages}
        >
          {Array.isArray(connector.data_types) &&
            connector.data_types.includes('bill') && (
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
              <AsButton size="full" isLink>
                <NavLink
                  to={`/connected/${connector.slug}/accounts/${account._id}`}
                  onClick={onBack}
                >
                  <span>
                    {successButtonLabel || t('account.success.button.config')}
                  </span>
                </NavLink>
              </AsButton>
            </p>
          </div>
        </div>
      </div>
    )
  )
}

export default translate()(KonnectorSuccess)
