import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/konnectorFolder'

import DescriptionContent from './DescriptionContent'

export const KonnectorFolder = ({ t, account, driveUrl, connector }) => {
  return (
    <div>
      <DescriptionContent
        title={t('account.folder.title')}
      >
        <p>
          <span className={styles['col-account-folder-highlighted-data']}>{account.auth.folderPath}</span>
          {driveUrl
            ? <a className={styles['col-account-folder-link']} href={`${driveUrl}${account.folderId}`}>{t('account.folder.link')}</a>
            : ''
          }

        </p>
      </DescriptionContent>
    </div>
  )
}

export default translate()(KonnectorFolder)
