import styles from '../styles/connectionManagement.styl'

import React, { Component } from 'react'
import { cozyConnect } from 'redux-cozy-client'
import { connect } from 'react-redux'

import { getAccount } from '../ducks/accounts'
import {
  getTriggerLastExecution,
  isConnectionRunning
} from '../ducks/connections'
import {
  getRegistryKonnector,
  isFetchingRegistryKonnector
} from '../ducks/registry'
import { getTriggerByKonnector } from '../reducers'

import Modal, { ModalContent } from 'cozy-ui/react/Modal'
import AccountConnection from './AccountConnection'
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
  }

  componentWillReceiveProps(nextProps) {
    const isInvalidKonnectorSlug =
      nextProps.params.konnectorSlug && !nextProps.konnector

    if (isInvalidKonnectorSlug) {
      console.warn && console.warn('Invalid konnector slug')
      return this.gotoParent()
    }

    const isInvalidAccountId =
      nextProps.params.accountId && !nextProps.existingAccount
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
      <Modal secondaryAction={() => this.gotoParent()}>
        <ModalContent className={styles['col-account-modal']}>
          {isWorking ? (
            <div className={styles['installing']}>
              <div className={styles['installing-spinner']} />
              <div>{t('loading.working')}</div>
            </div>
          ) : (
            <AccountConnection
              alertDeleteSuccess={messages => this.alertDeleteSuccess(messages)}
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
        const { params } = this.props
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
        router.push(resolvedOriginPath)
      } else {
        let url = router.location.pathname
        router.push(url.substring(0, url.lastIndexOf('/')))
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
  const { accountId, konnectorSlug } = ownProps.params
  const konnector = getRegistryKonnector(state.registry, konnectorSlug)
  const trigger = getTriggerByKonnector(state, konnector)
  return {
    existingAccount: getAccount(state.cozy, accountId),
    isWorking: isFetchingRegistryKonnector(state.registry),
    konnector: konnector,
    isRunning: isConnectionRunning(state.connections, trigger),
    lastExecution: getTriggerLastExecution(state.cozy, trigger),
    trigger
  }
}

export default connect(mapStateToProps)(
  cozyConnect(mapDocumentsToProps, mapActionsToProps)(ConnectionManagement)
)
