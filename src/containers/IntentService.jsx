import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateAccountService from '../components/services/CreateAccountService'
import ServiceBar from '../components/services/ServiceBar'
import ServiceKonnectorsList from '../components/services/ServiceKonnectorsList'

import { getRegistryKonnector } from '../ducks/registry'

class IntentService extends Component {
  constructor(props) {
    super(props)

    if (props.konnectors && props.konnectors.length === 1) {
      this.state = {
        konnector: props.konnectors[0],
        isUnique: true
      }
    }
  }

  reset() {
    this.setState({
      konnector: null
    })
  }

  onSuccess(account) {
    const { isUnique } = this.state

    if (isUnique) {
      this.reset()
      return this.props.onTerminate(account)
    }

    this.reset()
  }

  onCancel() {
    const { isUnique } = this.state

    if (isUnique) {
      return this.props.onCancel()
    }

    this.reset()
  }

  showKonnector(konnector) {
    this.setState({
      konnector: konnector
    })
  }

  render() {
    const { appData, konnectors, onCancel } = this.props
    const { konnector, error, disableSuccessTimeout, closeable } = this.state

    const { t } = this.context

    return (
      <div className="coz-service">
        {error && (
          <div className="coz-error coz-service-error">
            <p>{t(error.message)}</p>
            <p>{t('intent.service.error.cause', { error: error.reason })}</p>
          </div>
        )}
        <div className="coz-service-layout">
          <ServiceBar
            appEditor={appData.cozyAppEditor}
            appName={appData.cozyAppName}
            iconPath={`../${appData.cozyIconPath}`}
            onCancel={onCancel}
            closeable={closeable}
            hasReturnToKonnectorsListButton={
              !error && konnectors.length > 1 && konnector
            }
            returnToKonnectorsList={() => this.setState({ konnector: null })}
            {...this.context}
          />
          {konnector && (
            <CreateAccountService
              konnector={konnector}
              onCancel={() => this.onCancel()}
              onSuccess={account => this.onSuccess(account)}
              disableSuccessTimeout={disableSuccessTimeout}
              closeModal={() => this.onCancel()}
              {...this.context}
            />
          )}
          {!konnector &&
            konnectors.length > 1 && (
              <ServiceKonnectorsList
                konnectorsList={konnectors}
                showKonnector={konnector => this.showKonnector(konnector)}
              />
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { data } = ownProps
  const { slug } = data
  return {
    konnectors: (slug && [getRegistryKonnector(state.registry, slug)]) || []
  }
}

export default connect(mapStateToProps)(IntentService)
