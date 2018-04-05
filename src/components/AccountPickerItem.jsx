import styles from '../styles/accountPicker'
import classNames from 'classnames'

import React from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { getAccount } from '../ducks/accounts'
import { getAccountLogin, getAccountName } from '../lib/helpers'

export const AccountPickerItem = ({ account, konnectorSlug }) => {
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
      <span>
        <span className={styles['col-account-picker-button-label']}>
          {getAccountName(account)}
        </span>
        {nameAndLoginDiffer && <small>{accountLogin}</small>}
      </span>
    </NavLink>
  )
}

const mapStateToProps = (state, ownProps) => ({
  account: getAccount(state.cozy, ownProps.accountId)
})

export default connect(mapStateToProps)(AccountPickerItem)
