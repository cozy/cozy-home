import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateAccountIntent from '../components/intents/CreateAccountIntent'
import { getKonnector } from '../ducks/konnectors'

class IntentService extends Component {
  render() {
    const { appData, konnector, onCancel, onTerminate } = this.props
    const { error } = this.state

    const { t } = this.context

    return (
      <div className="coz-service">
        {error && (
          <div className="coz-error coz-service-error">
            <p>{t(error.message)}</p>
            <p>{t('intent.service.error.cause', { error: error.reason })}</p>
          </div>
        )}
        <CreateAccountIntent
          appData={appData}
          konnector={konnector}
          onCancel={() => onCancel()}
          onSuccess={account => onTerminate(account)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { data } = ownProps
  const { slug } = data
  return {
    konnector: slug && getKonnector(state.cozy, slug)
  }
}

export default connect(mapStateToProps)(IntentService)
