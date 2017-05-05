/* global fetch */
/* global cozy */
import { Component } from 'react'

import * as accounts from './accounts'
import * as konnectors from './konnectors'

const INSTALL_TIMEOUT = 120 * 1000

export default class DataConnectStore {
  constructor (connectors, folders, context) {
    this.listener = null
    this.connectors = connectors
    this.folders = folders
    this.useCases = require(`../contexts/${context}/index`).useCases
  }

  subscribeTo (connectorId, listener) {
    this.listener = listener
    return this.find(c => c.id === connectorId)
  }

  unsubscribe () {
    this.listener = null
  }

  updateConnector (connector) {
    if (connector) {
      this.connectors = this.connectors.map(
        c => c.slug === connector.slug ? Object.assign({}, c, connector) : c
      )
    }
    return this.connectors.find(k => k.slug === connector.slug)
  }

  getCategories () {
    return this.connectors.map(a => a.category).filter((cat, idx, all) => all.indexOf(cat) === idx)
  }

  getUseCases () {
    return this.useCases
  }

  find (cb) {
    return this.connectors.find(cb)
  }

  findConnected () {
    return this.connectors.filter(c => c.accounts.length !== 0)
  }

  findByCategory ({filter}) {
    return filter === 'all' ? this.connectors
      : this.connectors.filter(c => c.category === filter)
  }

  findByUseCase (slug) {
    let useCase = this.useCases.find(u => u.slug === slug)
    return useCase.connectors.map(c1 => this.find(c2 => c1.slug === c2.slug))
  }

  // Account connection workflow, see
  // https://github.com/cozy/cozy-stack/blob/master/docs/konnectors_workflow_example.md
  connectAccount (konnector, account, folderPath) {
    // return object to store all business object implied in the connection
    const connection = {}

    // 1. Create folder, will be replaced by an intent or something else
    return cozy.client.files.createDirectoryByPath(folderPath)
      // 2. Create account
      .then(folder => {
        connection.folder = folder
        return accounts.create(cozy.client, konnector, account.auth, folder)
      })
      // 3. Konnector installation
      .then(account => {
        connection.account = account
        return konnectors.install(cozy.client, konnector, INSTALL_TIMEOUT)
      })
      // 4. Add account to konnector
      .then(konnector => {
        return konnectors.addAccount(cozy.client, konnector, connection.account)
      })
      // 5. Add permissions to folder for konnector
      .then(konnector => {
        connection.konnector = konnector
        this.updateConnector(konnector)
        return cozy.client.fetchJSON('PATCH', konnector.links.permissions, {
          data: {
            id: konnector.links.permissions,
            type: 'io.cozy.permissions',
            attributes: {
              type: 'app',
              source_id: konnector._id,
              permissions: {
                saveFolder: {
                  type: 'io.cozy.files',
                  values: [connection.folder._id]
                }
              }
            }
          }
        })
      })
      // 6. Reference konnector in folder
      .then(permission => {
        connection.permission = permission
        return cozy.client.data.addReferencedFiles(connection.konnector, connection.folder_id)
      })
      // 7. Run a job for the konnector
      .then(() => konnectors.run(
        cozy.client,
        connection.konnector,
        connection.account))
      // 8. Creates trigger
      .then(job => {
        connection.job = job
        return cozy.client.fetchJSON('POST', '/jobs/triggers', {
          data: {
            attributes: {
              type: '@cron',
              arguments: '0 0 0 * * *',
              worker: 'konnector',
              worker_arguments: {
                konnector: connection.konnector._id,
                account: connection.account._id,
                folderToSave: connection.folder._id
              }
            }
          }
        })
      })
      .then(() => connection)
  }

  fetchAccounts (accountType, index) {
    if (!index && this.accountsIndex) index = this.accountsIndex
    return accounts.getAccountsByType(cozy.client, accountType, index)
  }

  updateAccount (connectorId, accountIdx, values) {
    let connector = this.find(c => c.id === connectorId)
    connector.accounts[accountIdx] = values
    return this.putConnector(connector)
  }

  synchronize (connectorId) {
    let connector = this.find(c => c.id === connectorId)
    return this.importConnector(connector)
      .then(() => this.startConnectorPoll(connector.id))
  }

  deleteAccount (connectorId, accountIdx) {
    let connector = this.find(c => c.id === connectorId)
    connector.accounts.splice(accountIdx, 1)
    return this.importConnector(connector)
      .then(() => this.updateConnector(connector))
  }

  manifestToKonnector (manifest) {
    return manifest
  }

  // get properties from installed konnector or remote manifest
  fetchKonnectorInfos (slug) {
    return this.getInstalledConnector(slug)
      .then(konnector => {
        if (!konnector) {
          konnector = this.connectors.find(k => k.slug === slug)
        }

        return konnector ? konnectors.fetchManifest(cozy.client, konnector.repo)
          .then(this.manifestToKonnector)
          .catch(error => {
            console.warn && console.warn(`Cannot fetch konnector's manifest (Error ${error.status})`)
            return konnector
          }) : null
      })
      .then(konnector => konnector ? this.updateConnector(konnector) : null)
  }

  getInstalledConnector (slug) {
    return konnectors.findBySlug(cozy.client, slug)
  }

  putConnector (connector) {
    return this.fetch('PUT', `konnectors/${connector.id}`, connector)
      .then(response => {
        return response.status === 200
          ? response.text()
          : Promise.reject(response)
      })
      .then((body) => {
        let connector = JSON.parse(body)
        this.updateConnector(connector)
        return connector
      })
  }

  importConnector (connector) {
    return this.fetch('POST', `konnectors/${connector.id}/import`, connector)
      .then(response => {
        return response.status === 200
          ? response
          : Promise.reject(response)
      })
  }

  startConnectorPoll (connectorId, timeout = 30000, interval = 500) {
    let endTime = Number(new Date()) + timeout

    let checkCondition = function (resolve, reject) {
      return this.fetch('GET', `konnectors/${connectorId}`)
        .then(response => response.text()).then(body => {
          let connector = JSON.parse(body)
          if (!connector.isImporting) {
            this.updateConnector(connector)
            resolve(connector)
          } else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject)
          } else {
            this.updateConnector(connector)
            reject(new Error('polling timed out'))
          }
        })
    }.bind(this)
    return new Promise((resolve, reject) => {
      setTimeout(checkCondition, 500, resolve, reject)
    })
  }

  refreshFolders () {
    return this.fetch('GET', 'folders')
      .then(response => response.text()).then(body => {
        this.folders = JSON.parse(body)
        Promise.resolve()
      })
  }

  fetch (method, url, body) {
    const STACK_DOMAIN = '//' + document.querySelector('[role=application]').dataset.cozyDomain
    const STACK_TOKEN = document.querySelector('[role=application]').dataset.cozyToken
    let params = {
      method: method,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STACK_TOKEN}`
      }
    }
    if (body) {
      params.body = JSON.stringify(body)
    }
    return fetch(`${STACK_DOMAIN}${url}`, params)
      .then(response => {
        let data
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.indexOf('json') >= 0) {
          data = response.json()
        } else {
          data = response.text()
        }

        return (response.status === 200 || response.status === 202 || response.status === 204)
          ? data
          : data.then(Promise.reject.bind(Promise))
      })
  }

  createIntentService (intent, window) {
    return cozy.client.intents.createService(intent, window)
  }
}

export class Provider extends Component {
  getChildContext () {
    return { store: this.store }
  }

  constructor (props, context) {
    super(props, context)
    this.store = props.store
  }

  render ({children}) {
    return (children && children[0]) || null
  }
}
