import styles from '../styles/accountPicker'
import classNames from 'classnames'

import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { NavLink } from 'react-router-dom'
import Icon from 'cozy-ui/react/Icon'
import Spinner from 'cozy-ui/react/Spinner'

import { getAccount } from '../ducks/accounts'
import { getAccountLogin, getAccountName } from '../lib/helpers'
import { getErrorTitle } from '../lib/konnectors'

export const AccountPickerItem = ({
  t,
  connection,
  hasUpdate,
  konnectorSlug,
  account
}) => {
  const { error, hasError, isRunning, isConnected } = connection
  const accountName = getAccountName(account)
  const accountLogin = getAccountLogin(account)
  const nameAndLoginDiffer = accountName !== accountLogin
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
      {hasError &&
        !hasUpdate && (
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
        )}
      {hasUpdate && (
        <div className={styles['col-account-picker-button-status']}>
          <span>{t('connector.update')}</span>
        </div>
      )}
      {isConnected && <Icon icon="check-circleless" color="#2BBA40" />}
      {isRunning && <Spinner />}
    </NavLink>
  )
}

const mapStateToProps = (state, ownProps) => ({
  account: getAccount(
    state.cozy,
    ownProps.connection && ownProps.connection.account
  )
})

export default connect(mapStateToProps)(translate()(AccountPickerItem))
