import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateAccountIntent from '../components/intents/CreateAccountIntent'
import InstallKonnectorIntent from '../components/intents/InstallKonnectorIntent'
import { getKonnector, receiveInstalledKonnector } from '../ducks/konnectors'

class IntentService extends Component {
  handleInstallationSuccess(konnector) {
    this.props.receiveKonnector(konnector)
  }

  onError(error) {
    this.setState({
      error: error
    })
  }

  render() {
    const { appData, data, konnector, onCancel } = this.props
    const { error } = this.state
    const { t } = this.context

    return (
      <div className="coz-service">
        {error && (
          <div className="coz-error coz-service-error">
            <p>{t(error.message)}</p>
            {error.reason && (
              <p>{t('intent.service.error.cause', { error: error.reason })}</p>
            )}
          </div>
        )}
        {!error && konnector ? (
          <CreateAccountIntent
            appData={appData}
            konnector={konnector}
            onCancel={onCancel}
            onSuccess={account => this.onTerminate(account)}
          />
        ) : (
          <InstallKonnectorIntent
            data={data}
            onError={error => this.onError(error)}
            onCancel={onCancel}
            onSuccess={konnector => this.handleInstallationSuccess(konnector)}
          />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  receiveKonnector: konnector => dispatch(receiveInstalledKonnector(konnector))
})

const mapStateToProps = (state, ownProps) => {
  const { data } = ownProps
  const { slug } = data
  return {
    konnector: slug && getKonnector(state.cozy, slug)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentService)
