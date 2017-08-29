import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import styles from '../styles/accountConnection'

import AccountConnectionData from './AccountConnectionData'
import DescriptionContent from './DescriptionContent'
import KonnectorAccount from './KonnectorAccount'
import KonnectorSuccess from './KonnectorSuccess'

export const KonnectorInstall = ({ t, account, connector, deleting, disableSuccessTimeout, driveUrl, error, fields, folderPath, hasGlobalError, isTimeout, isUnloading, oAuthTerminated, onAccountConfig, onCancel, onDelete, onSubmit, submitting, success }) => {
  return (
    <div className={styles['col-account-connection-content']}>
      <div className={styles['col-account-connection-form']}>

        { hasGlobalError && <DescriptionContent
          cssClassesObject={{'coz-error': true}}
          title={t('account.message.error.global.title')}
          messages={[t('account.message.error.global.description', {name: connector.name})]}
        /> }

        { !success && <KonnectorAccount
          account={account}
          connector={connector}
          disableSuccessTimeout={disableSuccessTimeout}
          deleting={deleting}
          editing={false}
          error={error}
          fields={fields}
          isUnloading={isUnloading}
          oAuthTerminated={oAuthTerminated}
          onCancel={onCancel}
          onDelete={onDelete}
          onSubmit={onSubmit}
          submitting={submitting}
        /> }

        { success && <KonnectorSuccess
          connector={connector}
          driveUrl={driveUrl}
          folderId={account.folderId}
          folderPath={folderPath}
          isTimeout={isTimeout}
          isUnloading={isUnloading}
          onAccountConfig={onAccountConfig}
          onCancel={onCancel}
          success={success}
        /> }

      </div>

      <AccountConnectionData
        connector={connector}
      />

    </div>
  )
}

export default translate()(KonnectorInstall)
