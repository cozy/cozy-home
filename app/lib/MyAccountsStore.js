/* global fetch */
/* global cozy */
import { Component } from 'preact'

const INSTALL_TIMEOUT = 120

export default class MyAccountsStore {
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
    this.connectors = this.connectors.map(
      c => c.slug === connector.slug ? Object.assign({}, c, connector) : c
    )
    if (this.listener) {
      this.listener(this.find(c => c.slug === connector.slug))
    }
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

  connectAccount (connectorId, values, accountId = 0) {
    let connector = this.find(c => c.id === connectorId)
    connector.accounts[accountId] = values
    return this.importConnector(connector)
      .then(() => this.refreshFolders())
      .then(() => this.startConnectorPoll(connector.id))
  }

  addAccount (connectorId, values = {}) {
    let connector = this.find(c => c.id === connectorId)
    connector.accounts.push(values)
    this.updateConnector(connector)
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

  fetchOrInstallConnector (slug) {
    const connectorSpec = this.connectors.find(conn => conn.slug === slug)
    return this.fetchConnector(connectorSpec)
    .then(connector => {
      if (connector === null) {
        return this.installConnector(connectorSpec)
      } else {
        return connector
      }
    })
  }

  // Fetch stack data for the given connector
  fetchConnector (connector) {
    return cozy.client.data.defineIndex('io.cozy.konnectors', ['slug'])
      .then(index => cozy.client.data.query(index, {selector: {slug: connector.slug}}))
      .then(list => {
        if (list.length) {
          return list[0]
        } else {
          return null
        }
      })
      .then(connector => {
        if (connector) this.updateConnector(connector)
        return connector
      })
  }

  // Trigger the installation of the given connector
  // and check that the installation is terminated
  installConnector (connector) {
    return this.fetch('POST', `/konnectors/${connector.slug}?Source=${encodeURIComponent(connector.repo)}`)
      .then(() => new Promise((resolve, reject) => {
        const idTimeout = setTimeout(() => {
          reject(new Error('konnector installation timeout error'))
        }, INSTALL_TIMEOUT * 1000)

        // monitor the status of the connector
        const idInterval = setInterval(() => {
          this.fetchConnector(connector)
            .then(connector => {
              if (connector.state === 'ready') {
                clearTimeout(idTimeout)
                clearInterval(idInterval)
                resolve(connector)
              }
            })
            .catch(err => {
              clearTimeout(idTimeout)
              clearInterval(idInterval)
              reject(err)
            })
        }, 1000)
      }))
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
