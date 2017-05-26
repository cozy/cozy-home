import React, { Component } from 'react'

import Modal from 'cozy-ui/react/Modal'
import ModalContent from 'cozy-ui/react/Modal/Content'
import AccountConnection from './AccountConnection'
import Notifier from '../components/Notifier'

let AUTHORIZED_DATATYPE = [
  'activity', 'heartbeat', 'calendar', 'commit',
  'consumption', 'contact', 'contract', 'travelDate', 'event', 'bill',
  'stepsNumber', 'podcast', 'weight', 'bloodPressure', 'appointment',
  'refund', 'sleepTime', 'courseMaterial', 'temperature', 'tweet'
]
let isValidType = (type) => AUTHORIZED_DATATYPE.indexOf(type) !== -1

export default class ConnectorManagement extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
    const {t} = context
    const connector = this.store.find(c => c.slug === props.params.connectorSlug)
    this.store.subscribeTo(
      connector.id,
      refreshedConnector => this.setState({
        connector: refreshedConnector,
        isInstalled: this.isInstalled(refreshedConnector)
      })
    )
    const { name, fields } = connector

    this.state = {
      connector: this.sanitize(connector),
      isConnected: connector.accounts.length !== 0,
      isInstalled: this.isInstalled(connector),
      isWorking: true,
      selectedAccount: 0,
      fields: this.configureFields(fields, context.t, name),
      submitting: false,
      synching: false,
      deleting: false,
      error: null
    }

    this.store.fetchKonnectorInfos(props.params.connectorSlug)
      .then(konnector => {
        return this.store
          .fetchAccounts(props.params.connectorSlug, null)
          .then(accounts => {
            konnector.accounts = accounts
            this.setState({
              connector: konnector,
              isConnected: konnector.accounts.length !== 0,
              isWorking: false
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

  closeModal () {
    const { router } = this.context
    const url = router.location.pathname
    router.push(url.substring(0, url.lastIndexOf('/')))
  }

  render () {
    const { accounts } = this.state.connector
    const { isConnected, selectedAccount, isWorking } = this.state
    const { t } = this.context

    return (
      <Modal secondaryAction={() => this.closeModal()}>
        <ModalContent>
          { isWorking
            ? <div className='installing'>
              <div className='installing-spinner' />
              <div>{t('working')}</div>
            </div>
            : <AccountConnection
              account={isConnected ? accounts[selectedAccount] : null}
              onError={(error) => this.handleError(error)}
              onSuccess={(account) => this.handleSuccess(account)}
              onCancel={() => this.gotoParent()}
              {...this.state}
              {...this.context} />
          }
        </ModalContent>
      </Modal>
    )
  }

  handleSuccess (account) {
    this.gotoParent()
  }

  handleError (error) {
    const { t } = this.context

    Notifier.error(t(`${error.message || error}`))
    this.gotoParent()
  }

  gotoParent () {
    const router = this.context.router
    let url = router.location.pathname
    router.push(url.substring(0, url.lastIndexOf('/')))
  }

  selectAccount (idx) {
    this.setState({ selectedAccount: idx })
  }

  synchronize () {
    const id = this.state.connector.id
    const { t } = this.context
    this.setState({ synching: true })
    this.store.synchronize(id)
      .then(fetchedConnector => {
        this.setState({ synching: false })
        if (fetchedConnector.importErrorMessage) {
          this.setState({ error: fetchedConnector.importErrorMessage })
        }
      })
      .catch(error => { // eslint-disable-line
        this.setState({ synching: false })
        Notifier.error(t('account config error'))
      })
  }

  deleteAccount (account) {
    const { t } = this.context
    this.setState({ deleting: true })
    this.store.deleteAccount(this.state.connector, account)
      .then(() => {
        this.setState({
          deleting: false,
          isConnected: false
        })

        this.gotoParent()
        Notifier.info(t('account delete success'))
      })
      .catch(error => { // eslint-disable-line
        this.setState({ deleting: false })
        this.gotoParent()
        Notifier.error(t('account delete error'))
        throw error
      })
  }

  getDefaultValues () {
    let defaults = {}
    Object.keys(this.state.fields).map(k => {
      defaults[k] = this.state.fields[k].default || ''
    })
    return defaults
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
    if (fields.folderPath && !fields.folderPath.default) {
      fields.folderPath.default = '/' + t('title') + '/' + connectorName
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
