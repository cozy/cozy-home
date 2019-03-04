import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { TriggerManager } from 'cozy-harvest-lib'
import flag from 'cozy-flags'

import KonnectorMaintenance from './KonnectorMaintenance'
import LegacyKonnectorInstall from './LegacyKonnectorInstall'
import { getKonnector } from 'ducks/konnectors'
import styles from '../styles/konnectorInstall'

export class KonnectorInstall extends PureComponent {
  render() {
    const {
      account,
      konnector,
      lang,
      maintenance,
      onDone,
      onLoginSuccess
    } = this.props
    return flag('harvest') ? (
      <div className={styles['col-account-connection-content']}>
        <div className={styles['col-account-connection-form']}>
          {maintenance && maintenance.longTerm ? (
            <KonnectorMaintenance
              maintenance={maintenance}
              lang={lang}
              konnectorName={konnector.name}
            />
          ) : (
            <TriggerManager
              account={account}
              konnector={konnector}
              onLoginSuccess={onLoginSuccess}
              onDone={onDone}
            />
          )}
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

export default connect(mapStateToProps)(KonnectorInstall)
