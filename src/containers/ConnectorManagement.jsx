import React, { Component } from 'react'

import ConnectorDialog from '../components/ConnectorDialog'
import AccountConnection from '../components/AccountConnection'
import AccountManagement from '../components/AccountManagement'
import Notifier from '../components/Notifier'

let AUTHORIZED_DATATYPE = [
  'activity', 'heartbeat', 'calendar', 'commit',
  'consumption', 'contact', 'contract', 'travelDate', 'event', 'bill',
  'stepsNumber', 'podcast', 'weight', 'bloodPressure', 'appointment',
  'refund', 'sleepTime', 'courseMaterial', 'temperature', 'tweet'
]
let isValidType = (type) => AUTHORIZED_DATATYPE.indexOf(type) !== -1

const prepareConnectURL = (connector) => {
  let connectUrl = connector.connectUrl
  if (!connectUrl) {
    return
  }

  // Based on the current code borrowed from legacy konnectors, we check
  // if the url contains a redirect_uri or redirect_url string, we assume that
  // this string is positionned at the end of the connrectURL. In the future
  // we should quickly use an additionnal parameter indicating if the url needs
  // a redirect or not.
  const hasRedirect = !!(['redirect_uri=', 'redirect_url='].find((redirect) => {
    return connectUrl.indexOf(redirect) !== -1
  }))

  if (hasRedirect) {
    // Use Router instead of document ? or injected location ? How ?
    const l = document.location
    // Use function parameter in the future
    const accountIndex = 0

    const redirectUrl = `${l.origin}${l.pathname}konnectors/` +
      `${connector.id}/${accountIndex}/redirect`
    connectUrl += encodeURIComponent(redirectUrl)
  }

  return connectUrl
}

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
        this.store.fetchAccounts(props.params.connectorSlug, null)
        .then(accounts => {
          konnector.accounts = accounts
          this.setState({
            connector: konnector,
            isConnected: konnector.accounts.length !== 0,
            isWorking: false
          })
        })
        .catch(error => {
          Notifier.error(t(error.message || error))
          this.gotoParent()
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
    const { slug, color, name, customView, accounts, lastImport } = this.state.connector
    const { connector, isConnected, selectedAccount, isWorking } = this.state
    const { t } = this.context

    if (isWorking) {
      return <ConnectorDialog slug={slug} color={color ? color.css : ''} enableDefaultIcon>
        {/* @TODO temporary component, prefer the use of a clean spinner comp when UI is updated */}
        <div className='installing'>
          <div className='installing-spinner' />
          <div>{t('working')}</div>
        </div>
      </ConnectorDialog>
    } else {
      return (
        <ConnectorDialog slug={slug} color={color ? color.css : ''} enableDefaultIcon>
          {isConnected
            ? <AccountManagement
              name={name}
              customView={customView}
              lastImport={lastImport}
              accounts={accounts}
              values={accounts[selectedAccount].auth || {}}
              selectAccount={idx => this.selectAccount(idx)}
              addAccount={() => this.addAccount()}
              synchronize={() => this.synchronize()}
              deleteAccount={idx => this.deleteAccount(idx)}
              cancel={() => this.gotoParent()}
              onSubmit={values => this.updateAccount(selectedAccount, values)}
              {...this.state}
              {...this.context} />
            : <AccountConnection
              connectUrl={prepareConnectURL(this.state.connector)}
              onSubmit={values => this.connectAccount(Object.assign(values, {folderPath: t('konnector default base folder', connector)}))}
              {...this.state}
              {...this.context} />
          }
        </ConnectorDialog>
      )
    }
  }

  gotoParent () {
    const router = this.context.router
    let url = router.location.pathname
    router.push(url.substring(0, url.lastIndexOf('/')))
  }

  selectAccount (idx) {
    this.setState({ selectedAccount: idx })
  }

  addAccount () {
    const { t } = this.context
    this.store.addAccount(this.state.connector, this.getDefaultValues())
    .then(connector => {
      this.setState({
        connector
      })
      this.selectAccount(this.state.connector.accounts.length - 1)
    })
    .catch(() => {
      Notifier.error(t('account config error'))
    })
  }

  async connectAccount ({login, password, folderPath}) {
    const { t } = this.context

    const account = {
      auth: {
        login: login,
        password: password
      }
    }

    this.setState({ submitting: true })

    this.store.connectAccount(this.state.connector, account, folderPath)
      .then(connection => {
        this.setState({ submitting: false })
        if (connection.error) {
          this.setState({ error: connection.error.message })
        } else {
          this.gotoParent()
          if (folderPath) {
            Notifier.info(t('account config success'), t('account config details') + folderPath)
          } else {
            Notifier.info(t('account config success'))
          }
        }
      })
      .catch(error => { // eslint-disable-line
        this.setState({ submitting: false })
        console.error(error)
        Notifier.error(t('account config error'))
      })
  }

  connectAccountOAuth (values) {
    return this._updateAccount(0, values)
      .then(() => {
        window.open(prepareConnectURL(this.state.connector), 'width=800,height=800')
      })
  }

  updateAccount (idx, values) {
    const { t } = this.context
    this._updateAccount(idx, values)
      .then(() => {
        Notifier.info(t('account config success'))
      })
  }

  _updateAccount (idx, values) {
    const id = this.state.connector.id
    const { t } = this.context
    this.setState({ submitting: true })
    return this.store.updateAccount(id, idx, values)
      .then(fetchedConnector => {
        this.setState({ submitting: false })
        return fetchedConnector
      })
      .catch(error => { // eslint-disable-line
        this.setState({ submitting: false })
        Notifier.error(t('account config error'))
        return Promise.reject(error)
      })
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

  deleteAccount (idx) {
    const id = this.state.connector.id
    const { t } = this.context
    this.setState({ deleting: true })
    this.store.deleteAccount(id, idx)
      .then(() => {
        this.setState({ deleting: false })
        if (this.state.connector.accounts.length === 0) {
          this.gotoParent()
        } else {
          this.selectAccount(0)
        }
        Notifier.info(t('account delete success'))
      })
      .catch(error => { // eslint-disable-line
        this.setState({ deleting: false })
        Notifier.error(t('account delete error'))
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
