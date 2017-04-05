/* global fetch */
import { Component } from 'preact'

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
      c => c.id === connector.id ? Object.assign({}, c, connector) : c
    )
    if (this.listener) {
      this.listener(this.find(c => c.id === connector.id))
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
    let params = {
      method: method,
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    if (body) {
      params.body = JSON.stringify(body)
    }
    return fetch(url, params)
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
    return children && children[0] || null
  }
}
