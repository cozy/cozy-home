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

// customized function to center a popup window
// source https://stackoverflow.com/a/16861050
function PopupCenter (url, title, w, h) {
  // Fixes dual-screen position
  var dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : screen.left
    //                                  Most browsers      Firefox
  var dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : screen.top

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth : screen.width
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight : screen.height

  var left = ((width / 2) - (w / 2)) + dualScreenLeft
  var top = ((height / 2) - (h / 2)) + dualScreenTop
  var newWindow = window.open('', title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)
  newWindow.location.href = url

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
  return newWindow
}

export default class ConnectorManagement extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = this.context.store
    // methods binding
    this.terminateOAuth = this.terminateOAuth.bind(this)
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

  render () {
    const { slug, color, name, accounts, lastImport } = this.state.connector
    const { connector, isConnected, selectedAccount, isWorking } = this.state
    const { t } = this.context

    let accountValues = {}
    // if oauth account
    if (accounts[selectedAccount] && connector.oauth) {
      accountValues = accounts[selectedAccount].oauth
    } else if (accounts[selectedAccount]) {
      accountValues = accounts[selectedAccount].auth
    }

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
              lastImport={lastImport}
              accounts={accounts}
              values={accountValues}
              selectAccount={idx => this.selectAccount(idx)}
              addAccount={() => this.addAccount()}
              synchronize={() => this.synchronize()}
              deleteAccount={idx => this.deleteAccount(accounts[selectedAccount])}
              cancel={() => this.gotoParent()}
              onSubmit={values => this.updateAccount(selectedAccount, values)}
              onOAuth={accountType => this.connectAccountOAuth(accountType)}
              {...this.state}
              {...this.context} />
            : <AccountConnection
              onSubmit={values => this.connectAccount(Object.assign(values, {folderPath: t('konnector default base folder', connector)}))}
              onOAuth={accountType => this.connectAccountOAuth(accountType)}
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

  connectAccount ({login, password, folderPath}) {
    const account = {
      auth: {
        login: login,
        password: password
      }
    }

    this.setState({ submitting: true })

    return this.runConnection(account, folderPath)
      .catch(error => this.setState({submitting: false, error: error.message}))
  }

  runConnection (account, folderPath) {
    const { t } = this.context
    return this.store.connectAccount(this.state.connector, account, folderPath)
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
        Notifier.error(t(`error.${error.message || error}`))
        this.gotoParent()
      })
  }

  terminateOAuth (messageEvent) {
    const { t } = this.context
    if (!messageEvent.data) return // data shouldn't be empty
    // if wrong connector oauth window
    if (messageEvent.data.origin !== `${this.props.params.connectorSlug}_oauth`) return
    // get account id from the message event and remove the listener
    const accountID = messageEvent.data.key
    window.removeEventListener('message', this.terminateOAuth)

    // update connector to get the new account
    this.setState({submitting: true})
    this.store.fetchKonnectorInfos(this.props.params.connectorSlug)
      .then(konnector => {
        return this.store
          .fetchAccounts(this.props.params.connectorSlug, null)
          .then(accounts => {
            konnector.accounts = accounts
            const currentIdx = accounts.findIndex(a => a._id === accountID)
            const folderPath = t('konnector default base folder', konnector)
            return this.runConnection(
              accounts[currentIdx],
              folderPath
            ).then(() => {
              this.setState({
                connector: konnector,
                isConnected: konnector.accounts.length !== 0,
                selectedAccount: currentIdx,
                submitting: false
              })
            }).catch(
              error => this.setState({submitting: false, error: error.message})
            )
          })
      })
      .catch(error => {
        this.setState({submitting: false, error: error.message})
      })
  }

  connectAccountOAuth (accountType) {
    const cozyUrl =
      `${window.location.protocol}//${document.querySelector('[role=application]').dataset.cozyDomain}`
    const newTab = PopupCenter(`${cozyUrl}/accounts/${accountType}/start`, `${accountType}_oauth`, 800, 800)
    // listener for oauth window
    const boundOAuthCb = this.terminateOAuth
    window.addEventListener('message', boundOAuthCb)
    // polling to monitor oauth window closing
    ;(function monitorOAuthClosing () {
      if (newTab.closed) {
        window.removeEventListener('message', boundOAuthCb)
      } else {
        setTimeout(monitorOAuthClosing, 1000)
      }
    })()
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
