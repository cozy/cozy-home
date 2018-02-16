/* global cozy */
import styles from '../styles/accountConnection'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  deleteConnection,
  getConnectionError,
  isConnectionConnected,
  isConnectionDeleting,
  isConnectionEnqueued,
  launchTriggerAndQueue
} from '../ducks/connections'
import { getKonnectorTriggersCount } from '../reducers'
import { fetchAccount } from '../ducks/accounts'
import classNames from 'classnames'

import { translate } from 'cozy-ui/react/I18n'

import KonnectorInstall from '../components/KonnectorInstall'
import KonnectorEdit from '../components/KonnectorEdit'
import { getKonnectorIcon } from '../lib/icons'
import { popupCenter, waitForClosedPopup } from '../lib/popup'
import statefulForm from '../lib/statefulForm'

class AccountConnection extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = this.context.store

    if (this.props.error) this.handleError({ message: this.props.error })

    this.state = {
      account: this.props.existingAccount,
      editing: !!this.props.existingAccount,
      isFetching: false,
      maintenance:
        this.props.maintenance &&
        this.props.maintenance[this.props.konnector.slug],
      lang: this.context.lang
    }
    // TODO : Add updateFields
    if (props.fields.folderPath) this.fetchFolders()
  }

  componentWillReceiveProps(nextProps) {
    const { existingAccount, success } = nextProps

    const hasJustSucceed = !this.props.success && success
    const accountHasJustBeenCreated =
      !this.props.existingAccount && !!existingAccount

    if (hasJustSucceed && this.props.onSuccess) {
      this.props.onSuccess(this.state.account)
    }

    if (accountHasJustBeenCreated) {
      this.setState({
        account: existingAccount
      })
    }
  }

  fetchFolders() {
    const { fields, values, editing, t } = this.props
    fields.namePath.placeholder = t('account.form.placeholder.namePath')
    // Fetch Folders

    this.setState({ isFetching: true })
    this.store
      .fetchFolders()
      .then(folders => {
        this.setState({ folders: folders })
        fields.folderPath.options = []
        folders.map(folder => {
          if (`${values.folderPath}/${values.namePath}` !== folder.path) {
            fields.folderPath.options.push({
              name: folder.path,
              path: folder.path
            })
          }
        })
        // Add default folder path for installation
        !editing &&
          fields.folderPath.options.push({
            name: values.folderPath,
            path: values.folderPath
          })
      })
      .then(() => this.setState({ isFetching: false }))
  }

  connectAccount(auth) {
    const { konnector } = this.props
    let { account } = this.state

    if (account) {
      return this.updateAccount(konnector, account, {
        ...auth
      })
    }

    account = {
      auth
    }

    return this.runConnection(account).catch(error => this.handleError(error))
  }

  connectAccountOAuth(accountType, values, scope) {
    this.setState({
      submitting: true,
      oAuthError: null,
      oAuthTerminated: false
    })

    const cozyUrl = `${window.location.protocol}//${document.querySelector(
      '[role=application]'
    ).dataset.cozyDomain}`
    const newTab = popupCenter(
      `${cozyUrl}/accounts/${accountType}/start?scope=${scope}&state=xxx&nonce=${Date.now()}`,
      `${accountType}_oauth`,
      800,
      800
    )
    return waitForClosedPopup(newTab, `${accountType}_oauth`)
      .then(accountID => {
        return this.terminateOAuth(accountID, values)
      })
      .catch(error => {
        this.setState({ submitting: false, oAuthError: error.message })
      })
  }

  terminateOAuth(accountID, accountValues) {
    this.setState({
      oAuthTerminated: true
    })

    this.props
      .fetchAccount(accountID)
      .then(account => {
        const { konnector } = this.props
        this.setState({ account: account })
        return this.runConnection(account).then(connection => {
          this.setState({
            connector: konnector,
            submitting: false
          })
        })
      })
      .catch(error => this.handleError(error))
  }

  runConnection(account) {
    this.setState({ submitting: true, connectionError: null })

    return this.store
      .connectAccount(
        this.props.konnector,
        account,
        this.props.disableSuccessTimeout
      )
      .then(connection => {
        this.setState({ submitting: false })
        if (connection.account) {
          this.setState({
            account: connection.account
          })
        }

        if (connection.error) {
          return Promise.reject(connection.error)
        } else {
          return Promise.resolve(connection)
        }
      })
  }

  updateAccount(connector, account, values) {
    Object.assign(account.auth, values)

    this.setState({ submitting: true })

    return this.store
      .updateAccount(connector, account, values)
      .then(account => {
        this.setState({ account: account })
        return this.store
          .runAccount(
            this.props.trigger,
            connector,
            account,
            this.props.disableSuccessTimeout
          )
          .then(() => {
            this.setState({
              submitting: false
            })
          })
      })
      .catch(error => this.handleError(error))
  }

  deleteConnection() {
    return this.props
      .deleteConnection()
      .then(() => this.handleDeleteSuccess())
      .catch(error => this.handleError(error))
  }

  handleDeleteSuccess() {
    this.setState({
      submitting: false
    })

    if (typeof this.props.alertDeleteSuccess === 'function') {
      this.props.alertDeleteSuccess([
        { message: 'account.message.success.delete' }
      ])
    }
  }

  handleError(error) {
    console.error(error)

    this.setState({
      submitting: false,
      connectionError: error.message
    })
  }

  // @param isUpdate : used to force updating values not related to OAuth
  onSubmit = () => {
    const { values, konnector } = this.props
    const { account } = this.state
    const valuesToSubmit = Object.assign({}, values)
    // namePath defined by the user is concatened with the folderPath
    if (valuesToSubmit.folderPath) {
      if (valuesToSubmit.namePath) {
      } else {
        valuesToSubmit.namePath =
          valuesToSubmit.accountName ||
          valuesToSubmit.identifier ||
          valuesToSubmit.login ||
          valuesToSubmit.email ||
          konnector.name
      }
      valuesToSubmit.namePath = valuesToSubmit.namePath.replace(
        /[&/\\#,+()$@~%.'":*?<>{}]/g,
        '_'
      )
      valuesToSubmit.folderPath = `${valuesToSubmit.folderPath}/${valuesToSubmit.namePath}`
    }
    // Update the path if the name path is the account name
    const folderId =
      this.props.trigger && this.props.trigger.message.folder_to_save
    const accountName = account && account.auth && account.auth.accountName
    if (
      accountName &&
      accountName.replace(/[&/\\#,+()$@~%.'":*?<>{}]/g, '_') ===
        account.auth.namePath &&
      accountName !== valuesToSubmit.accountName
    ) {
      cozy.client.files.updateAttributesById(folderId, {
        name: valuesToSubmit.accountName
      })
      valuesToSubmit.namePath = valuesToSubmit.accountName.replace(
        /[&/\\#,+()$@~%.'":*?<>{}]/g,
        '_'
      )
    }
    // Update account
    return konnector && konnector.oauth
      ? this.connectAccountOAuth(
          konnector.slug,
          valuesToSubmit,
          konnector.oauth_scope
        )
      : this.connectAccount(valuesToSubmit)
  }

  cancel() {
    this.props.onCancel()
  }

  buildSuccessMessages(konnector) {
    const { t } = this.context
    const messages = [
      t('account.message.success.connect', {
        name: konnector.name
      })
    ]

    if (
      konnector.additionnalSuccessMessage &&
      konnector.additionnalSuccessMessage.message
    ) {
      messages.push(t(konnector.additionnalSuccessMessage.message))
    }

    return messages
  }

  render() {
    const {
      createdAccount,
      disableSuccessTimeout,
      isUnloading,
      onNext,
      allRequiredFieldsAreFilled,
      allRequiredFilledButPasswords,
      displayAdvanced,
      toggleAdvanced,
      dirty,
      isValid,
      isValidButPasswords,
      fields,
      isSuccess,
      deleting,
      konnector,
      lastSuccess,
      error,
      forceConnection,
      isRunning,
      queued,
      t,
      trigger,
      success,
      closeModal,
      successButtonLabel,
      accountsCount
    } = this.props
    const {
      account,
      connectionError,
      editing,
      oAuthError,
      oAuthTerminated,
      submitting,
      isFetching,
      folders,
      maintenance,
      lang
    } = this.state
    const { driveUrl } = this.store
    const successMessages =
      success || queued ? this.buildSuccessMessages(konnector) : []
    return (
      <div className={styles['col-account-connection']}>
        <div className={styles['col-account-connection-header']}>
          <img
            className={classNames(
              styles['col-account-connection-icon'],
              'col-account-connection-icon'
            )}
            src={getKonnectorIcon(konnector)}
          />
        </div>

        {editing ? ( // Properly load the edit view or the initial config view
          <KonnectorEdit
            isFetching={isFetching}
            account={account}
            editing={editing}
            connector={konnector}
            deleting={deleting}
            disableSuccessTimeout={disableSuccessTimeout}
            driveUrl={driveUrl}
            error={error || oAuthError || connectionError}
            folders={folders}
            fields={fields}
            isUnloading={isUnloading}
            lastSuccess={lastSuccess}
            oAuthTerminated={oAuthTerminated}
            onCancel={() => this.cancel()}
            onDelete={() => this.deleteConnection()}
            onForceConnection={forceConnection}
            onSubmit={this.onSubmit}
            submitting={submitting || isRunning}
            allRequiredFieldsAreFilled={allRequiredFieldsAreFilled}
            isValid={isValid}
            allRequiredFilledButPasswords={allRequiredFilledButPasswords}
            isValidButPasswords={isValidButPasswords}
            success={success}
            trigger={trigger}
            closeModal={closeModal}
            dirty={dirty}
            maintenance={maintenance}
            lang={lang}
          />
        ) : (
          <KonnectorInstall
            accountsCount={accountsCount}
            isFetching={isFetching}
            account={createdAccount}
            connector={konnector}
            isValid={isValid}
            dirty={dirty}
            isSuccess={isSuccess}
            deleting={deleting}
            disableSuccessTimeout={disableSuccessTimeout}
            driveUrl={driveUrl}
            error={error || oAuthError || connectionError}
            fields={fields}
            queued={queued}
            isUnloading={isUnloading}
            oAuthTerminated={oAuthTerminated}
            onNext={onNext}
            onCancel={() => this.cancel()}
            onDelete={() => this.deleteConnection()}
            onSubmit={() => this.onSubmit()}
            submitting={submitting || isRunning}
            success={success || queued}
            successMessage={t(
              queued && !success
                ? 'account.success.title.timeout'
                : 'account.success.title.connect',
              { name: konnector.name }
            )}
            successButtonLabel={successButtonLabel}
            successMessages={successMessages}
            trigger={trigger}
            allRequiredFieldsAreFilled={allRequiredFieldsAreFilled}
            displayAdvanced={displayAdvanced}
            toggleAdvanced={toggleAdvanced}
            maintenance={maintenance}
            lang={lang}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  success: isConnectionConnected(state.connections, ownProps.trigger),
  deleting: isConnectionDeleting(state.connections, ownProps.trigger),
  error: getConnectionError(state.connections, ownProps.trigger),
  queued: isConnectionEnqueued(state.connections, ownProps.trigger),
  accountsCount: getKonnectorTriggersCount(state, ownProps.konnector)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const { konnector, trigger } = ownProps
  return {
    fetchAccount: accountId =>
      dispatch(fetchAccount(accountId)).then(response => response.data[0]),
    forceConnection: () =>
      dispatch(
        launchTriggerAndQueue(trigger, !!konnector && konnector.loginDelay)
      ),
    deleteConnection: () => dispatch(deleteConnection(trigger))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  statefulForm()(translate()(AccountConnection))
)
