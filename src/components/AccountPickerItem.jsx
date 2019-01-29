import styles from '../styles/accountPicker'
import classNames from 'classnames'

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { NavLink } from 'react-router-dom'
import Icon from 'cozy-ui/react/Icon'
import Spinner from 'cozy-ui/react/Spinner'

import { getAccount } from '../ducks/accounts'
import { getAccountLogin, getAccountName } from '../lib/helpers'
import { getErrorTitle } from '../lib/konnectors'
import { isInMaintenance } from '../ducks/konnectors'

const MAINTENANCE = 'MAINTENANCE'
const ERRORED = 'ERRORED'
const HAS_UPDATE = 'HAS_UPDATE'
const CONNECTED = 'CONNECTED'

const getStatus = ({ hasError, hasUpdate, isConnected, inMaintenance }) => {
  if (hasUpdate) return HAS_UPDATE
  if (inMaintenance) return MAINTENANCE
  if (hasError) return ERRORED
  if (isConnected) return CONNECTED
}

export class AccountPickerItem extends PureComponent {
  getStatusContent = () => {
    const { t, inMaintenance, connection, hasUpdate } = this.props
    const { error, hasError, isConnected } = connection

    const accountStatus = getStatus({
      hasError,
      hasUpdate,
      isConnected,
      inMaintenance
    })
    switch (accountStatus) {
      case MAINTENANCE:
        return (
          <div className={styles['col-account-picker-button-status']}>
            <span>{t('maintenance.service')}</span>
          </div>
        )
      case ERRORED:
        return (
          <div
            className={classNames(
              styles['col-account-picker-button-status'],
              styles['col-account-picker-button-status--error']
            )}
          >
            <span>
              {getErrorTitle(t, error, key => `connection.error.${key}.title`)}
            </span>
            <Icon icon="warning" />
          </div>
        )
      case HAS_UPDATE:
        return (
          <div className={styles['col-account-picker-button-status']}>
            <span>{t('connector.update')}</span>
          </div>
        )
      case CONNECTED:
        return <Icon icon="check-circleless" color="#2BBA40" />
    }
  }

  render() {
    const { connection, konnectorSlug, account } = this.props
    const { isRunning } = connection
    const accountName = getAccountName(account)
    const accountLogin = getAccountLogin(account)
    const nameAndLoginDiffer = accountName !== accountLogin
    const statusContent = this.getStatusContent()
    return (
      <NavLink
        to={`/connected/${konnectorSlug}/accounts/${account._id}`}
        className={classNames(
          styles['col-account-picker-button'],
          styles['col-account-picker-button-account']
        )}
      >
        <div className={styles['col-account-picker-button-infos']}>
          <span>{accountName}</span>
          {nameAndLoginDiffer && <small>{accountLogin}</small>}
        </div>
        {statusContent}
        {isRunning && <Spinner />}
      </NavLink>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { konnectorSlug } = ownProps
  return {
    account: getAccount(
      state.cozy,
      ownProps.connection && ownProps.connection.account
    ),
    inMaintenance: isInMaintenance(konnectorSlug)
  }
}

export default connect(mapStateToProps)(translate()(AccountPickerItem))
