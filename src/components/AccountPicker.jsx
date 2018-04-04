import styles from '../styles/accountPicker'
import classNames from 'classnames'

import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'

import { getConnectionsByKonnector } from '../reducers'
import { getKonnector } from '../ducks/konnectors'

import Icon from 'cozy-ui/react/Icon'
import Modal, { ModalHeader, ModalContent } from 'cozy-ui/react/Modal'
import { NavLink, Redirect, withRouter } from 'react-router-dom'

import AccountPickerItem from './AccountPickerItem'
import KonnectorHeaderIcon from './KonnectorHeaderIcon'
import addAccountIcon from '../assets/icons/icon-plus.svg'

export const AccountPicker = ({
  t,
  connections,
  history,
  konnector,
  match
}) => {
  const { konnectorSlug } = match.params
  if (!connections.length)
    return <Redirect to={`/connected/${konnector.slug}/new`} />
  return (
    <Modal dismissAction={() => history.push('/connected')}>
      <ModalHeader>
        <KonnectorHeaderIcon konnector={konnector} />
      </ModalHeader>
      <ModalContent>
        <ul className={styles[classNames('col-account-picker')]}>
          {connections.map(connection => (
            <li>
              <AccountPickerItem
                konnectorSlug={konnectorSlug}
                connection={connection}
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
