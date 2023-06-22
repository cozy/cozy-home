import React, { Component } from 'react'
import { connect } from 'react-redux'

import { IntentTriggerManager } from 'cozy-harvest-lib'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import KonnectorSuccess from 'components/KonnectorSuccess'
import { getKonnector } from 'ducks/konnectors'
import styles from 'styles/konnectorInstall.styl'

const vaultUnlockFormProps = { useAllAvailableSpace: true }

export class KonnectorInstall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trigger: null,
      success: false
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  handleLoginSuccess(trigger) {
    this.setState({
      trigger,
      success: true
    })

    this.props.onLoginSuccess(trigger)
  }

  handleSuccess(trigger) {
    this.setState({
      trigger,
      success: true
    })

    this.props.onSuccess(trigger)
  }

  render() {
    const {
      account,
      konnector,
      legacySuccess,
      onDone,
      successMessage,
      successMessages,
      successButtonLabel,
      t,
      onCancel
    } = this.props

    const { trigger, success } = this.state

    if (success || legacySuccess) {
      return (
        <KonnectorSuccess
          account={account}
          connector={konnector}
          folderId={trigger && trigger.message.folder_to_save}
          onDone={onDone}
          title={successMessage}
          trigger={trigger}
          messages={successMessages}
          successButtonLabel={successButtonLabel}
        />
      )
    }

    return (
      <div className={styles['col-account-connection-content']}>
        <div className={styles['col-account-connection-form']}>
          <h4 className="u-ta-center">
            {t('account.config.title', { name: konnector.name })}
          </h4>
          <IntentTriggerManager
            vaultUnlockFormProps={vaultUnlockFormProps}
            account={account}
            konnector={konnector}
            onLoginSuccess={this.handleLoginSuccess}
            onSuccess={this.handleSuccess}
            vaultClosable={false}
            onClose={onCancel}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  konnector: getKonnector(state.oldcozy, ownProps.connector.slug)
})

export default translate()(connect(mapStateToProps)(KonnectorInstall))
