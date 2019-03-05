import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

import styles from '../styles/konnectorFolder'

import DescriptionContent from './DescriptionContent'

class KonnectorFolder extends React.Component {
  render({ t, account, driveUrl, trigger }) {
    return (
      <div className={styles['col-account-folder']}>
        {account &&
          account.auth && (
            <DescriptionContent
              title={t('account.folder.withoutSettings.title')}
            >
              {driveUrl && (
                <a
                  className={styles['col-account-folder-link']}
                  href={`${driveUrl}${trigger.message.folder_to_save}`}
                >
                  {t('account.folder.link')}
                </a>
              )}
            </DescriptionContent>
          )}
      </div>
    )
  }
}

export default translate()(KonnectorFolder)
