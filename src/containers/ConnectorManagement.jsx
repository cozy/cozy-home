import styles from '../styles/connectorManagement.styl'

import React, { Component } from 'react'
import { cozyConnect } from 'redux-cozy-client'

import { fetchAccount } from '../ducks/accounts'
import { getKonnectorConnectedAccount } from '../ducks/connections'

import Modal, { ModalContent } from 'cozy-ui/react/Modal'
import AccountConnection from './AccountConnection'
import Notifier from '../components/Notifier'

const AUTHORIZED_DATATYPE = require('config/datatypes')
const isValidType = type => AUTHORIZED_DATATYPE.includes(type)

class ConnectorManagement extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store
    const { t } = context
    const connector = this.store.find(
      c => c.slug === props.params.connectorSlug
    )
    const { fields } = connector

    this.state = {
      connector: this.sanitize(connector),
      isConnected: connector.accounts.length !== 0 && !connector.accounts.error,
      isInstalled: this.isInstalled(connector),
      isWorking: true,
      fields: fields,
      submitting: false,
      synching: false,
      deleting: false,
      error: null,
      isClosing: false
    }

    Promise.all([
      this.store.fetchKonnectorInfos(props.params.connectorSlug),
      this.store.fetchDriveUrl()
    ])
      .then(result => {
        const [konnector] = result
        return this.store
          .fetchAccounts(props.params.connectorSlug)
          .then(accounts => {
            const error = konnector.accounts.error

            konnector.accounts = accounts
            // do not loose previous connector attributes
            this.setState({
              connector: Object.assign({}, this.state.connector, konnector),
              isConnected: konnector.accounts.length !== 0 && !error,
              isWorking: false,
              error
            })
          })
      })
      .catch(error => {
        Notifier.error(t(error.message || error))
        this.gotoParent()
      })
  }

  isInstalled(connector) {
    return connector.state != null && connector.state === 'ready'
  }

  render() {
    const { existingAccount, isWorking, isClosing } = this.state
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
              existingAccount={existingAccount}
              alertSuccess={messages => this.alertSuccess(messages)}
              onCancel={() => this.gotoParent()}
              isUnloading={isClosing}
              {...this.state}
              {...this.context}
            />
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

  sanitize(connector) {
    // remove invalid dataType declaration
    if (!connector.dataType) {
      return connector
    }

    return Object.assign({}, connector, {
      dataType: connector.dataType.filter(isValidType)
    })
  }
}

const mapActionsToProps = dispatch => ({})

const mapDocumentsToProps = (state, ownProps) => {
  return {
    existingAccount: () => {
      const id = getKonnectorConnectedAccount(
        state.connections,
        ownProps.konnector
      )
      return id ? fetchAccount(id) : null
    }
  }
}

export default cozyConnect(mapDocumentsToProps, mapActionsToProps)(
  ConnectorManagement
)
