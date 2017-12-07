import styles from '../styles/connectorManagement.styl'

import React, { Component } from 'react'
import { cozyConnect } from 'redux-cozy-client'
import { connect } from 'react-redux'

// import { fetchAccount } from '../ducks/accounts'
import {
  getTriggerLastExecution,
  isConnectionRunning
} from '../ducks/connections'
import {
  getRegistryKonnector,
  isFetchingRegistryKonnector
} from '../ducks/registry'
import {
  getKonnectorConnectedAccount,
  getTriggerByKonnector
} from '../reducers'
// import { getKonnectorConnectedAccount } from '../ducks/connections'

import Modal, { ModalContent } from 'cozy-ui/react/Modal'
import AccountConnection from './AccountConnection'
import Notifier from '../components/Notifier'

class ConnectorManagement extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store

    this.state = {
      isWorking: true,
      isClosing: false
    }

    this.store.fetchDriveUrl()
  }

  render() {
    const { isWorking } = this.props
    const { isClosing } = this.state
    const { t } = this.context
    return (
      <Modal secondaryAction={() => this.gotoParent()}>
        <ModalContent className={styles['col-account-modal']}>
          {isWorking ? (
            <div className={styles['installing']}>
              <div className={styles['installing-spinner']} />
              <div>{t('loading.working')}</div>
            </div>
          ) : (
            <AccountConnection
              alertSuccess={messages => this.alertSuccess(messages)}
              onCancel={() => this.gotoParent()}
              isUnloading={isClosing}
              {...this.state}
              {...this.props}
              {...this.context}
            />
            // <div>Test</div>
          )}
        </ModalContent>
      </Modal>
    )
  }

  alertSuccess(messages) {
    const { t } = this.context

    Notifier.info([
      messages
        .map(item => {
          return t(item.message, item.params)
        })
        .join('.\n')
    ])

    this.gotoParent()
  }

  gotoParent() {
    this.setState({ isClosing: true })

    // The setTimeout allows React to perform setState related actions
    setTimeout(() => {
      const router = this.context.router
      let url = router.location.pathname
      router.push(url.substring(0, url.lastIndexOf('/')))
    }, 0)
  }
}

const mapActionsToProps = dispatch => ({})

// Accéder au state depuis ici ?
const mapDocumentsToProps = ownProps => ({
  // konnector: fetchRegistryKonnectorBySlug(ownProps.params.connectorSlug)
  // existingAccount: fetchAccount(ownProps.accountId)
})

const mapStateToProps = (state, ownProps) => {
  const konnector = getRegistryKonnector(
    state.registry,
    ownProps.params.connectorSlug
  )
  const trigger = getTriggerByKonnector(state, konnector)
  return {
    existingAccount: getKonnectorConnectedAccount(state, konnector),
    isWorking: isFetchingRegistryKonnector(state.registry),
    konnector: konnector,
    isRunning: isConnectionRunning(state.connections, trigger),
    lastExecution: getTriggerLastExecution(state.cozy, trigger),
    trigger
    // const konnector = getKonnector()
    // accountId: getKonnectorConnectedAccount(state.connections, ownProps.konnector)
  }
}

export default connect(mapStateToProps)(
  cozyConnect(mapDocumentsToProps, mapActionsToProps)(ConnectorManagement)
)
