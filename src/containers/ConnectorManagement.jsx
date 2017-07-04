import styles from '../styles/connectorManagement.styl'

import React, { Component } from 'react'

import Modal, { ModalContent } from 'cozy-ui/react/Modal'
import AccountConnection from './AccountConnection'
import Notifier from '../components/Notifier'

const AUTHORIZED_DATATYPE = require('config/datatypes')
const isValidType = (type) => AUTHORIZED_DATATYPE.includes(type)

export default class ConnectorManagement extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
    const {t} = context
    const connector = this.store.find(c => c.slug === props.params.connectorSlug)
    const { name, fields } = connector

    this.state = {
      connector: this.sanitize(connector),
      isConnected: connector.accounts.length !== 0 && !connector.accounts.error,
      isInstalled: this.isInstalled(connector),
      isWorking: true,
      selectedAccount: 0,
      fields: this.configureFields(fields, context.t, name),
      submitting: false,
      synching: false,
      deleting: false,
      error: null,
      isClosing: false
    }

    this.store.fetchKonnectorInfos(props.params.connectorSlug)
      .then(konnector => {
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

  isInstalled (connector) {
    return connector.state != null && connector.state === 'ready'
  }

  render () {
    const { accounts } = this.state.connector
    const { selectedAccount, isWorking, isClosing } = this.state
    const { t } = this.context

    return (
      <Modal secondaryAction={() => this.gotoParent()}>
        <ModalContent>
          {isWorking
            ? <div className={styles['installing']}>
              <div className={styles['installing-spinner']} />
              <div>{t('loading.working')}</div>
            </div>
            : <AccountConnection
              existingAccount={accounts.length ? accounts[selectedAccount] : null}
              alertSuccess={(messages) => this.alertSuccess(messages)}
              onCancel={() => this.gotoParent()}
              isUnloading={isClosing}
              {...this.state}
              {...this.context} />
          }
        </ModalContent>
      </Modal>
    )
  }

  alertSuccess (messages) {
    const { t } = this.context

    Notifier.info([
      messages.map(item => {
        return t(item.message, item.params)
      }).join('.\n')
    ])

    this.gotoParent()
  }

  gotoParent () {
    this.setState({isClosing: true})

    // The setTimeout allows React to perform setState related actions
    setTimeout(() => {
      const router = this.context.router
      let url = router.location.pathname
      router.push(url.substring(0, url.lastIndexOf('/')))
    }, 0)
  }

  selectAccount (idx) {
    this.setState({ selectedAccount: idx })
  }

  sanitize (connector) {
    // remove invalid dataType declaration
    return Object.assign({}, connector,
      {
        dataType: connector.dataType.filter(isValidType)
      }
    )
  }

  // Set default values for advanced fields that will not be shown
  // on the initial connection form
  configureFields (fields, t, connectorName) {
    if (fields.calendar && !fields.calendar.default) {
      fields.calendar.default = connectorName
    }
    if (fields.folderPath && !fields.folderPath.options) {
      fields.folderPath.options = this.store.folders.map(f => f.path + '/' + f.name)
      fields.folderPath.folders = this.store.folders
    }
    if (!fields.frequency) {
      fields.frequency = {
        type: 'text',
        advanced: true
      }
    }
    if (fields.frequency && !fields.frequency.default) {
      fields.frequency.default = 'week'
    }
    return fields
  }
}
