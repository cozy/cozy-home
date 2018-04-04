import styles from '../styles/accountPicker'
import classNames from 'classnames'

import React from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { getAccount } from '../ducks/accounts'
import { getAccountName } from '../lib/helpers'

export const AccountPickerItem = ({ account, konnectorSlug }) => (
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
      {!!account.auth.accountName && <small>{account.auth.login}</small>}
    </span>
  </NavLink>
)

const mapStateToProps = (state, ownProps) => ({
  account: getAccount(state.cozy, ownProps.accountId)
})

export default connect(mapStateToProps)(AccountPickerItem)
