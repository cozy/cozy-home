import React, { Component } from 'react'
import { cozyConnect } from 'redux-cozy-client'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Alerter from 'cozy-ui/react/Alerter'
import Icon from 'cozy-ui/react/Icon'
import Modal, { ModalContent, ModalHeader } from 'cozy-ui/react/Modal'

import backIcon from 'assets/sprites/icon-arrow-left.svg'
import AccountConnection from 'containers/AccountConnection'
import KonnectorHeaderIcon from 'components/KonnectorHeaderIcon'
import { getAccount } from 'ducks/accounts'
import {
  endConnectionCreation,
  getTriggerLastSuccess,
  isConnectionRunning,
  isCreatingConnection,
  startConnectionCreation
} from 'ducks/connections'
import { getKonnector } from 'ducks/konnectors'
import { getCompleteFolderPath } from 'lib/helpers'
import {
  getConnectionsByKonnector,
  getCreatedConnectionAccount,
  getTriggerByKonnectorAndAccount,
  getKonnectorsInMaintenance
} from 'reducers'
import styles from 'styles/connectionManagement.styl'

class ConnectionManagement extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store
    const { existingAccount, createdAccount, konnector } = props
    const { t } = this.context

    const account = existingAccount || createdAccount

    // Set values
    const values = (account && Object.assign({}, account.auth)) || {}
    // Split the actual folderPath account to get namePath & folderPath values
    if (account && values.folderPath) {
      values.folderPath = account.auth.folderPath.substring(
        0,
        account.auth.folderPath.lastIndexOf('/')
      )
      values.namePath = account.auth.namePath
    } else if (
      (!account &&
        konnector &&
        konnector.fields &&
        konnector.fields.advancedFields &&
        konnector.fields.advancedFields.folderPath) ||
      (!account && konnector && konnector.fields && konnector.folderPath)
    ) {
      values.folderPath = t('account.config.default_folder', {
        name: konnector.name
      })
    } else if (
      !account &&
      konnector &&
      Array.isArray(konnector.folders) &&
      konnector.folders.length
    ) {
      const folder = konnector.folders[0] // we only handle the first one for now
      if (folder.defaultDir) {
        values.folderPath = getCompleteFolderPath(
          folder.defaultDir,
          konnector.name,
          t
        )
      }
    }

    this.state = {
      isSuccess: false,
      values: values
    }
    if (konnector) {
      this.store.fetchUrls()

      if (!this.props.existingAccount) {
        if (this.props.isCreating) {
          // eslint-disable-next-line no-console
          console.warn(
            'Unexpected state: connection creation already in progress'
          )
        } else {
          this.props.startCreation()
        }
      }
    } else {
      return this.gotoParent()
    }

    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this)
  }

  componentWillReceiveProps(props) {
    this.UNSAFE_componentWillReceiveProps(props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const isInvalidKonnectorSlug =
      nextProps.match &&
      nextProps.match.params.konnectorSlug &&
      !nextProps.konnector

    if (isInvalidKonnectorSlug) {
      // eslint-disable-next-line no-console
      console.warn('Invalid konnector slug')
      return this.gotoParent()
    }

    const isInvalidAccountId =
      nextProps.match &&
      nextProps.match.params.accountId &&
      !nextProps.existingAccount
    if (isInvalidAccountId) {
      // eslint-disable-next-line no-console
      console.warn('Invalid account id')
      return this.gotoParent()
    }
  }

  render() {
    const {
      connections,
      createdAccount,
      existingAccount,
      konnector
    } = this.props
    // Do not even render if there is no konnector (in case of wrong URL)
    if (!konnector) return

    const { values, isSuccess } = this.state

    const backRoute = connections.length
      ? `/connected/${konnector.slug}`
      : '/connected'

    const editing = existingAccount && !createdAccount
    const isInstallSuccess = !editing && isSuccess
    return (
      <Modal
        dismissAction={() => this.gotoParent()}
        mobileFullscreen
        size="large"
        className={styles['col-account-modal']}
      >
        <ModalHeader
          className={
            isInstallSuccess ? styles['col-account-success-header'] : ''
          }
        >
          {!isInstallSuccess && (
            <div className="col-account-connection-header">
              {backRoute && (
                <NavLink
                  to={backRoute}
                  className="col-account-connection-back"
                  onClick={this.onEnd}
                >
                  <Icon icon={backIcon} />
                </NavLink>
              )}
              <KonnectorHeaderIcon konnector={konnector} center={!editing} />
            </div>
          )}
        </ModalHeader>
        <ModalContent>
          <AccountConnection
            handleDeleteSuccess={this.handleDeleteSuccess}
            editing={editing}
            onDone={() => this.gotoParent()}
            values={values}
            handleConnectionSuccess={this.handleConnectionSuccess}
            {...this.props}
            {...this.context}
          />
        </ModalContent>
      </Modal>
    )
  }

  handleDeleteSuccess() {
    const { t } = this.context
    Alerter.success(t('account.message.success.delete'))
    this.gotoParent()
  }

  onEnd = () => {
    const { endCreation, isCreating } = this.props
    if (isCreating) {
      typeof endCreation === 'function' && endCreation()
    }
  }

  handleConnectionSuccess = () => {
    this.setState({ isSuccess: true })
  }

  gotoParent() {
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

ConnectionManagement.contextTypes = {
  store: PropTypes.object
}

const mapActionsToProps = () => ({})

// Accéder au state depuis ici ?
const mapDocumentsToProps = () => ({
  // konnector: fetchRegistryKonnectorBySlug(ownProps.params.connectorSlug)
  // existingAccount: fetchAccount(ownProps.accountId)
})

const mapStateToProps = (state, ownProps) => {
  // infos from route parameters
  const { accountId, konnectorSlug } = ownProps.match && ownProps.match.params
  const konnector = getKonnector(state.cozy, konnectorSlug)
  const existingAccount = getAccount(state.cozy, accountId)
  const createdAccount = getCreatedConnectionAccount(state)
  const trigger = getTriggerByKonnectorAndAccount(
    state,
    konnector,
    existingAccount || createdAccount
  )
  const maintenance = getKonnectorsInMaintenance()
  return {
    connections: getConnectionsByKonnector(state, konnectorSlug),
    createdAccount,
    existingAccount,
    isCreating: isCreatingConnection(state.connections),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  cozyConnect(mapDocumentsToProps, mapActionsToProps)(
    withRouter(ConnectionManagement)
  )
)
