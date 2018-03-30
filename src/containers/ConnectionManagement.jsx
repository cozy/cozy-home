import styles from '../styles/connectionManagement.styl'

import React, { Component } from 'react'
import { cozyConnect } from 'redux-cozy-client'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getAccount } from '../ducks/accounts'
import {
  endConnectionCreation,
  getTriggerLastSuccess,
  isConnectionRunning,
  isCreatingConnection,
  startConnectionCreation
} from '../ducks/connections'
import {
  getRegistryKonnector,
  isFetchingRegistryKonnector
} from '../ducks/registry'
import {
  getCreatedConnectionAccount,
  getTriggerByKonnectorAndAccount,
  getKonnectorsInMaintenance
} from '../reducers'

import Modal, { ModalContent, ModalHeader } from 'cozy-ui/react/Modal'
import AccountConnection from './AccountConnection'
import KonnectorHeaderIcon from '../components/KonnectorHeaderIcon'
import Notifier from '../components/Notifier'

class ConnectionManagement extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store

    // Set values
    const values =
      (props.existingAccount &&
        Object.assign({}, props.existingAccount.auth)) ||
      {}
    // Split the actual folderPath account to get namePath & folderPath values
    if (props.existingAccount && values.folderPath) {
      values.folderPath = props.existingAccount.auth.folderPath.substring(
        0,
        props.existingAccount.auth.folderPath.lastIndexOf('/')
      )
      values.namePath = props.existingAccount.auth.namePath
    } else if (
      (!props.existingAccount &&
        props.konnector.fields &&
        props.konnector.fields.advancedFields &&
        props.konnector.fields.advancedFields.folderPath) ||
      (!props.existingAccount &&
        props.konnector.fields &&
        props.konnector.folderPath)
    ) {
      values.folderPath = this.context.t('account.config.default_folder', {
        name: props.konnector.name
      })
    }

    this.state = {
      isWorking: true,
      isClosing: false,
      values: values
    }

    this.store.fetchDriveUrl()

    if (!this.props.existingAccount) {
      if (this.props.isCreating) {
        console.warn &&
          console.warn(
            'Unexpected state: connection creation already in progress'
          )
      } else {
        this.props.startCreation()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const isInvalidKonnectorSlug =
      nextProps.match &&
      nextProps.match.params.konnectorSlug &&
      !nextProps.konnector

    if (isInvalidKonnectorSlug) {
      console.warn && console.warn('Invalid konnector slug')
      return this.gotoParent()
    }

    const isInvalidAccountId =
      nextProps.match &&
      nextProps.match.params.accountId &&
      !nextProps.existingAccount
    if (isInvalidAccountId) {
      console.warn && console.warn('Invalid account id')
      return this.gotoParent()
    }
  }

  render() {
    const { konnector } = this.props
    // Do not even render if there is no konnector (in case of wrong URL)
    if (!konnector) return

    const { isWorking } = this.props
    const { isClosing, values } = this.state
    const { t } = this.context

    return (
      <Modal
        dismissAction={() => this.gotoParent()}
        className={styles['col-account-modal']}
      >
        <ModalHeader>
          <div className={styles['col-account-connection-header']}>
            <KonnectorHeaderIcon konnector={konnector} />
          </div>
        </ModalHeader>
        <ModalContent>
          {isWorking ? (
            <div className={styles['installing']}>
              <div className={styles['installing-spinner']} />
              <div>{t('loading.working')}</div>
            </div>
          ) : (
            <AccountConnection
              alertDeleteSuccess={messages => this.alertDeleteSuccess(messages)}
              displayAccountsCount
              onNext={() => this.gotoParent()}
              onCancel={() => this.gotoParent()}
              isUnloading={isClosing}
              values={values}
              closeModal={() => this.gotoParent()}
              {...this.state}
              {...this.props}
              {...this.context}
            />
          )}
        </ModalContent>
      </Modal>
    )
  }

  alertDeleteSuccess(messages) {
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
      const { router } = this.context
      const { originPath } = this.props

      if (originPath) {
        const params = this.props.match.params
        const resolvedOriginPath = Object.keys(params)
          .filter(param => typeof params[param] === 'string')
          // Sort params from longest string to shortest string to avoid
          // unexpected replacements like :test in :test2.
          .sort(
            (a, b) => (a.length === b.length ? 0 : a.length > b.length ? -1 : 1)
          )
          .reduce(
            (path, param) => path.replace(`:${param}`, params[param]),
            originPath
          )
        router.history.push(resolvedOriginPath)
      } else {
        let url = router.history.location.pathname
        router.history.push(url.substring(0, url.lastIndexOf('/')))
      }

      if (this.props.isCreating) {
        this.props.endCreation()
      }
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
  // infos from route parameters
  const { accountId, konnectorSlug } = ownProps.match && ownProps.match.params
  const konnector = getRegistryKonnector(state.registry, konnectorSlug)
  const existingAccount = getAccount(state.cozy, accountId)
  const createdAccount = getCreatedConnectionAccount(state)
  const trigger = getTriggerByKonnectorAndAccount(
    state,
    konnector,
    existingAccount || createdAccount
  )
  const maintenance = getKonnectorsInMaintenance()
  return {
    createdAccount,
    existingAccount,
    isCreating: isCreatingConnection(state.connections),
    isWorking: isFetchingRegistryKonnector(state.registry),
    konnector: konnector,
    isRunning: isConnectionRunning(state.connections, trigger),
    lastSuccess: getTriggerLastSuccess(state.cozy, trigger),
    trigger,
    maintenance: maintenance
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  startCreation: () => dispatch(startConnectionCreation(ownProps.konnector)),
  endCreation: () => dispatch(endConnectionCreation())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  cozyConnect(mapDocumentsToProps, mapActionsToProps)(
    withRouter(ConnectionManagement)
  )
)
