import styles from '../styles/accountPicker'
import classNames from 'classnames'

import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { getConnectionsByKonnector } from '../reducers'
import { getKonnector } from '../ducks/konnectors'

import Icon from 'cozy-ui/react/Icon'
import Modal, { ModalHeader, ModalContent } from 'cozy-ui/react/Modal'
import { NavLink, Route, withRouter } from 'react-router-dom'

import AccountPickerItem from './AccountPickerItem'
import ConnectionManagement from '../containers/ConnectionManagement'

import { getKonnectorIcon } from '../lib/icons'

import addAccountIcon from '../assets/icons/icon-plus.svg'

export const AccountPicker = ({
  t,
  connections,
  history,
  konnector,
  match
}) => {
  const { konnectorSlug } = match.params
  return (
    <Modal dismissAction={() => history.push('/connected')}>
      <ModalHeader>
        <img
          className={styles['col-account-picker-header-image']}
          src={getKonnectorIcon(konnector)}
        />
      </ModalHeader>
      <ModalContent>
        <ul className={styles[classNames('col-account-picker')]}>
          {connections.map(connection => (
            <li>
              <AccountPickerItem
                konnectorSlug={konnectorSlug}
                accountId={connection.account}
              />
            </li>
          ))}
          <li>
            <NavLink
              to={`/connected/${konnectorSlug}/new`}
              className={classNames(
                styles['col-account-picker-button'],
                styles['col-account-picker-button-add']
              )}
            >
              <span>
                <Icon icon={addAccountIcon} />
                <span>{t('add_account')}</span>
              </span>
            </NavLink>
          </li>
        </ul>
      </ModalContent>
      <Route
        path="/connected/:konnectorSlug/new"
        render={props => (
          <ConnectionManagement originPath="/connected" {...props} />
        )}
      />
      <Route
        path="/connected/:konnectorSlug/accounts/:accountId"
        render={props => (
          <ConnectionManagement originPath="/connected" {...props} />
        )}
      />
    </Modal>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { konnectorSlug } = ownProps.match.params
  return {
    connections: getConnectionsByKonnector(state, konnectorSlug),
    konnector: getKonnector(state.cozy, konnectorSlug)
  }
}

export default connect(mapStateToProps)(translate()(withRouter(AccountPicker)))
