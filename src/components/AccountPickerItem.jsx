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
import { getMostAccurateErrorKey } from '../lib/konnectors'

const getErrorTitle = (t, error) =>
  t(getMostAccurateErrorKey(t, error, key => `connection.error.${key}.title`))

export const AccountPickerItem = ({
  t,
  connection,
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
        <div>{accountName}</div>
        {nameAndLoginDiffer && <small>{accountLogin}</small>}
      </div>
      {hasError && (
        <div className={styles['col-account-picker-button-error']}>
          <span>{getErrorTitle(t, error)}</span>
          <Icon icon="warning" />
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
