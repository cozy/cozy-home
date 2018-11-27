/* global cozy */
import styles from '../styles/accountConnection'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import collectConfig from 'config/collect'
import {
  deleteConnection,
  getConnectionError,
  isConnectionConnected,
  isConnectionDeleting,
  isConnectionEnqueued,
  launchTriggerAndQueue
} from '../ducks/connections'
import { fetchAccount } from '../ducks/accounts'

import { translate } from 'cozy-ui/react/I18n'

import KonnectorInstall from '../components/KonnectorInstall'
import KonnectorEdit from '../components/KonnectorEdit'
import { popupCenter, waitForClosedPopup } from '../lib/popup'
import statefulForm from '../lib/statefulForm'

import moment from 'moment'

const sanitizeDate = (date, localeFormat) => {
  const sanitizedFormat = 'YYYY-MM-DD'
  const isAlreadySanitized = moment(date, sanitizedFormat, true).isValid()
  if (isAlreadySanitized) return date
  const momentDate = moment(date, localeFormat, true)
  if (!momentDate.isValid()) throw new Error('Invalid date')
  return momentDate.format(sanitizedFormat)
}

const sanitizeDates = (values, fields, localeFormat) => {
  const sanitizedValues = { ...values }
  Object.keys(fields).forEach(key => {
    if (fields[key].type !== 'date') return
    sanitizedValues[key] = sanitizeDate(values[key], localeFormat)
  })
  return sanitizedValues
}

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
  }

  componentWillReceiveProps(props) {
    this.UNSAFE_componentWillReceiveProps(props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { existingAccount } = nextProps

    const accountHasJustBeenCreated =
      !this.props.existingAccount && !!existingAccount

    if (accountHasJustBeenCreated) {
      this.setState({
        account: existingAccount
      })
    }
  }

  connectAccount(auth) {
    return this.runConnection({ auth }).catch(error => this.handleError(error))
  }

  connectAccountOAuth(accountType, values, scope) {
    this.setState({
      submitting: true,
      oAuthError: null,
      oAuthTerminated: false
    })

    const cozyUrl = `${window.location.protocol}//${
      document.querySelector('[role=application]').dataset.cozyDomain
    }`
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
      .then(account => this.store.updateAccount(account, accountValues))
      .then(account => {
        const { konnector } = this.props
        this.setState({ account: account })
        return this.runConnection(account).then(() => {
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

  updateAccount(account, values) {
    account.auth = Object.assign({}, account.auth, values)

    this.setState({ submitting: true })

    return this.store
      .updateAccount(account, values)
      .then(account => {
        this.setState({ account: account })
        return this.store
          .runAccount(
            this.props.trigger,
            this.props.konnector,
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
    // eslint-disable-next-line no-console
    console.error(error)

    this.setState({
      submitting: false,
      connectionError: error.message
    })
  }

  // @param isUpdate : used to force updating values not related to OAuth
  onSubmit = () => {
    const { fields, values, konnector, t } = this.props
    const { account } = this.state
    let valuesToSubmit = { ...values }

    // namePath defined by the user is concatened with the folderPath
    if (valuesToSubmit.folderPath) {
      if (!valuesToSubmit.namePath) {
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
      valuesToSubmit.folderPath = `${valuesToSubmit.folderPath}/${
        valuesToSubmit.namePath
      }`
    }

    valuesToSubmit = sanitizeDates(
      valuesToSubmit,
      fields,
      t('date.format', { _: collectConfig.defaultDateFormat })
    )

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
    if (account) {
      return this.updateAccount(account, valuesToSubmit)
    }

    return konnector && konnector.oauth
      ? this.connectAccountOAuth(
          konnector.oauth.account_type || konnector.slug,
          valuesToSubmit,
          konnector.oauth.scope
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
      displayAccountsCount,
      isUnloading,
      allRequiredFieldsAreFilled,
      allRequiredFilledButPasswords,
      displayAdvanced,
      handleConnectionSuccess,
      toggleAdvanced,
      dirty,
      isValid,
      isValidButPasswords,
      fields,
      deleting,
      editing,
      konnector,
      lastSuccess,
      error,
      forceConnection,
      isRunning,
      onDone,
      queued,
      t,
      trigger,
      success,
      closeModal,
      successButtonLabel
    } = this.props
    const {
      account,
      connectionError,
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
        {editing ? ( // Properly load the edit view or the initial config view
          <KonnectorEdit
            isFetching={isFetching}
            account={account}
            connector={konnector}
            deleting={deleting}
            disableSuccessTimeout={disableSuccessTimeout}
            displayAdvanced={displayAdvanced}
            driveUrl={driveUrl}
            error={error || oAuthError || connectionError}
            folders={folders}
            fields={fields}
            isUnloading={isUnloading}
            lastSuccess={lastSuccess}
            oAuthTerminated={oAuthTerminated}
            onDelete={() => this.deleteConnection()}
            onForceConnection={forceConnection}
            onSubmit={this.onSubmit}
            submitting={submitting || isRunning}
            toggleAdvanced={toggleAdvanced}
            allRequiredFieldsAreFilled={allRequiredFieldsAreFilled}
            isValid={isValid}
            allRequiredFilledButPasswords={allRequiredFilledButPasswords}
            isValidButPasswords={isValidButPasswords}
            trigger={trigger}
            closeModal={closeModal}
            dirty={dirty}
            maintenance={maintenance}
            lang={lang}
          />
        ) : (
          <KonnectorInstall
            displayAccountsCount={displayAccountsCount}
            isFetching={isFetching}
            account={createdAccount}
            connector={konnector}
            handleConnectionSuccess={handleConnectionSuccess}
            isValid={isValid}
            dirty={dirty}
            disableSuccessTimeout={disableSuccessTimeout}
            error={error || oAuthError || connectionError}
            fields={fields}
            queued={queued}
            isUnloading={isUnloading}
            oAuthTerminated={oAuthTerminated}
            onDone={onDone}
            onCancel={() => this.cancel()}
            onSubmit={() => this.onSubmit()}
            submitting={submitting || isRunning}
            success={success || queued}
            successMessage={t('account.success.title.connect')}
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
  queued: isConnectionEnqueued(state.connections, ownProps.trigger)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(statefulForm()(withRouter(translate()(AccountConnection))))
