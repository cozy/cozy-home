import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { NavLink, Redirect, withRouter } from 'react-router-dom'

import flow from 'lodash/flow'

import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'
import Modal, { ModalHeader, ModalContent } from 'cozy-ui/react/Modal'

import AccountPickerItem from 'components/AccountPickerItem'
import KonnectorHeaderIcon from 'components/KonnectorHeaderIcon'
import backIcon from 'assets/sprites/icon-arrow-left.svg'
import { getKonnector } from 'ducks/konnectors'
import { hasPendingUpdate } from 'lib/konnectors'
import styles from 'styles/accountPicker'
import { getConnectionsByKonnector } from 'reducers'

import { withTriggersAndAccounts, KonnectorModal } from 'cozy-harvest-lib'
export const AccountPicker = ({
  t,
  connections,
  history,
  konnector,
  match,
  konnectorWithTriggers
}) => {
  const { konnectorSlug } = match.params
  if (!connections.length)
    return <Redirect to={`/connected/${konnector.slug}/new`} />
  return <KonnectorModal konnector={konnectorWithTriggers} />
  /*return (
    <Modal dismissAction={() => history.push('/connected')} mobileFullscreen>
      <ModalHeader>
        <div className="col-account-connection-header">
          <NavLink to="/connected" className="col-account-connection-back">
            <Icon icon={backIcon} />
          </NavLink>
          <KonnectorHeaderIcon konnector={konnector} />
        </div>
      </ModalHeader>
      <ModalContent>
        <ul className={styles[classNames('col-account-picker')]}>
          {connections.map((connection, index) => (
            <li key={index}>
              <AccountPickerItem
                konnectorSlug={konnectorSlug}
                connection={connection}
                hasUpdate={hasPendingUpdate(konnector)}
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
                <Icon icon="plus" />
                <span>{t('account_picker.add_account_button.label')}</span>
              </span>
            </NavLink>
          </li>
        </ul>
      </ModalContent>
    </Modal>
  )*/
}

const mapStateToProps = (state, ownProps) => {
  const { konnectorSlug } = ownProps.match.params
  return {
    connections: getConnectionsByKonnector(state, konnectorSlug),
    konnector: getKonnector(state.cozy, konnectorSlug)
  }
}

export default flow(
  connect(mapStateToProps),
  withTriggersAndAccounts,
  withRouter,
  translate()
)(AccountPicker)

//export default (translate()(withRouter()))
