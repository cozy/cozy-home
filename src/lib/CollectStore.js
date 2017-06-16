/* global fetch */
/* global cozy */
import { Component } from 'react'

import * as accounts from './accounts'
import * as konnectors from './konnectors'

const INSTALL_TIMEOUT = 120 * 1000

export default class CollectStore {
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

  sanitizeKonnector (konnector) {
    const sanitized = Object.assign({}, konnector)

    // disallow empty category
    if (sanitized.category === '') {
      delete sanitized.category
    }

    // disallow updating name and slug
    delete sanitized.name
    delete sanitized.slug
    // custom message only from collect json config
    delete sanitized.additionnalSuccessMessage
    // hasDescriptions only from collect json config
    delete sanitized.hasDescriptions
    // fields settings only from collect json config
    delete sanitized.fields

    return sanitized
  }

  // Merge source into target
  mergeKonnectors (source, target) {
    return Object.assign({}, target, this.sanitizeKonnector(source))
  }

  updateConnector (connector) {
    if (!connector) throw new Error('Missing mandatory connector parameter')
    const slug = connector.slug || connector.attributes.slug
    if (!slug) throw new Error('Missing mandatory slug property in konnector')

    const current = this.connectors.find(connector => connector.slug === slug)
    const updatedConnector = this.mergeKonnectors(connector, current)

    this.connectors = this.connectors.map(connector => {
      return connector === current
        ? updatedConnector
          : connector
    })

    return updatedConnector
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

  // Fetch all accounts and updates their matching connectors
  fetchAllAccounts () {
    return accounts.getAllAccounts(cozy.client, this.accountsIndex)
      .then(accounts => {
        return Promise.all([accounts, konnectors.getAllErrors(cozy.client)])
      })
      .then((result) => {
        const [accounts, errors] = result
        const errorIndex = errors.reduce((memo, error) => {
          memo[error.account] = error
          return memo
        }, {})

        let accObject = {}
        accounts.forEach(a => {
          if (!accObject[a.account_type]) accObject[a.account_type] = []
          if (errorIndex[a._id] && errorIndex[a._id].error) {
            a.error = errorIndex[a._id].error
            accObject[a.account_type].error = errorIndex[a._id].error
          }
          accObject[a.account_type].push(a)
        })
        this.connectors.forEach(c => {
          c.accounts = accObject[c.slug] || []
        })
      })
  }

  // Account connection workflow, see
  // https://github.com/cozy/cozy-stack/blob/master/docs/konnectors_workflow_example.md
  connectAccount (konnector, account, folderPath) {
    // return object to store all business object implied in the connection
    const connection = {}
    // detect oauth case
    const isOAuth = !!account.oauth

    // 1. Create folder, will be replaced by an intent or something else
    return cozy.client.files.createDirectoryByPath(folderPath)
      // 2. Create account
      .then(folder => {
        connection.folder = folder
        if (isOAuth) {
          const newAttributes = {
            folderId: folder._id,
            status: 'PENDING'
          }
          return accounts.update(cozy.client, account, Object.assign({}, account, newAttributes))
        } else {
          return accounts.create(cozy.client, konnector, account.auth, folder)
        }
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
        return konnectors.addFolderPermission(cozy.client, konnector, connection.folder._id)
      })
      // 6. Reference konnector in folder
      .then(permission => {
        connection.permission = permission
        return cozy.client.data.addReferencedFiles(connection.konnector, connection.folder._id)
      })
      // 7. Run a job for the konnector
      .then(() => konnectors.run(
        cozy.client,
        connection.konnector,
        connection.account))
      // 8. Creates trigger
      .then(job => {
        connection.job = job
        if (
          job.attributes.state !== konnectors.JOB_STATE.ERRORED &&
          job.attributes.state !== konnectors.JOB_STATE.DONE
        ) connection.successTimeout = true
        const slug = connection.konnector.slug || connection.konnector.attributes.slug
        return cozy.client.fetchJSON('POST', '/jobs/triggers', {
          data: {
            attributes: {
              type: '@cron',
              arguments: `0 0 0 * * ${(new Date()).getDay()}`,
              worker: 'konnector',
              worker_arguments: {
                konnector: slug,
                account: connection.account._id,
                folderToSave: connection.folder._id
              }
            }
          }
        })
      })
      .catch(error => {
        connection.error = error
      })
      .then(() => {
        this.updateKonnectorError(connection.konnector, connection.error)
        return connection
      })
  }

  updateKonnectorError (konnector, error = null) {
    konnector.accounts.error = error
    this.updateConnector(konnector)
  }

  /**
   * runAccount Runs an account
   * @param {object} connector A connector
   * @param {object} account   the account to run, must belong to the connector
   * @returns The run result or a resulting error
   */
  runAccount (connector, account) {
    return konnectors.run(cozy.client, connector, account)
    .then(() => this.updateKonnectorError(connector))
    .catch(error => {
      this.updateKonnectorError(connector, error)
      throw error
    })
  }

  fetchAccounts (accountType, index) {
    if (!index && this.accountsIndex) index = this.accountsIndex
    return accounts.getAccountsByType(cozy.client, accountType, index)
  }

  /**
   * updateAccount : updates an account in a connector in DB with new values
   * @param {Object} connector The connector to update
   * @param {Object} account   The account to update
   * @param {Object} values    The new values of the updated account
   * @returns {Object} The up to date connector
   */
  updateAccount (connector, account, values) {
    // Save the previous state
    const previousAccount = Object.assign({}, account)

    // Update account data
    account.auth.login = values.login
    account.auth.password = values.password

    return accounts.update(cozy.client, previousAccount, account)
    .then(updatedAccount => {
      const accountIndex = this.findAccountIndexById(connector.accounts, account._id)
      // Updates the _rev value of the account in the connector
      connector.accounts[accountIndex] = updatedAccount
      this.updateConnector(connector)
      return updatedAccount
    })
    .catch((error) => {
      return Promise.reject(error)
    })
  }

  /**
   * findAccountIndexById : returns the account index in an array of accounts, based on its id.
   * @param {array}    accounts Array of accounts
   * @param {string}   id       Id of the account we look for
   * @return {integer} The position of the account with the looked for id in the array
   */
  findAccountIndexById (accounts, id) {
    let foundIndex = -1
    accounts.forEach((account, index) => {
      if (account._id === id) {
        foundIndex = index
      }
    })
    return foundIndex
  }

  deleteAccount (konnector, account) {
    konnector = this.connectors.find(c => c._id === konnector._id)
    konnector.accounts.splice(konnector.accounts.indexOf(account), 1)

    return accounts._delete(cozy.client, account)
      .then(() => konnectors.unlinkFolder(cozy.client, konnector, account.folderId))
      .then(() => this.updateConnector(konnector))
      .then(() => this.updateKonnectorError(konnector))
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
