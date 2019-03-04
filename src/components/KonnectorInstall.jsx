import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { TriggerManager } from 'cozy-harvest-lib'
import flag from 'cozy-flags'

import KonnectorMaintenance from './KonnectorMaintenance'
import LegacyKonnectorInstall from './LegacyKonnectorInstall'
import { getKonnector } from 'ducks/konnectors'
import styles from '../styles/konnectorInstall'
import { translate } from 'cozy-ui/react/I18n'

export class KonnectorInstall extends PureComponent {
  render() {
    const {
      account,
      konnector,
      lang,
      maintenance,
      onDone,
      onLoginSuccess,
      t
    } = this.props

    if (maintenance && maintenance.longTerm)
      return (
        <KonnectorMaintenance
          maintenance={maintenance}
          lang={lang}
          konnectorName={konnector.name}
        />
      )

    return flag('harvest') ? (
      <div className={styles['col-account-connection-content']}>
        <div className={styles['col-account-connection-form']}>
          <h4 className="u-ta-center">
            {t('account.config.title', { name: konnector.name })}
          </h4>
          <TriggerManager
            account={account}
            konnector={konnector}
            onLoginSuccess={onLoginSuccess}
            onDone={onDone}
          />
        </div>
      </div>
    ) : (
      <LegacyKonnectorInstall {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  konnector: getKonnector(state.cozy, ownProps.connector.slug)
})

export default translate()(connect(mapStateToProps)(KonnectorInstall))
