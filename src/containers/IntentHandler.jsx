import React, { Component } from 'react'

import { withClient } from 'cozy-client'
import Intents from 'cozy-interapp'

import { translate } from 'cozy-ui/transpiled/react/providers/I18n'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'

import appEntryPoint from 'components/appEntryPoint'
import IntentService from 'containers/IntentService'

class IntentHandler extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      isInitializing: true
    }
    const intent = new Intents({ client: this.props.client })
    intent
      .createService()
      // eslint-disable-next-line promise/always-return
      .then(service => {
        this.setState({
          isInitializing: false,
          service: service
        })
      })
      .catch(error => {
        this.setState({
          isInitializing: false,
          error: {
            message: 'intent.service.error.initialization',
            reason: error.message
          }
        })
      })
  }

  terminate(account) {
    const { service } = this.state
    service.terminate(account)
  }

  cancel() {
    const { service } = this.state
    service.cancel()
  }

  handleError(error) {
    this.setState({
      error: {
        message: 'intent.service.error.creation',
        reason: error.message
      }
    })

    throw error
  }

  render() {
    // const { data } = this.props
    const { appData, accounts, konnectors, triggers, t } = this.props
    const { error, service } = this.state
    let { isInitializing } = this.state

    isInitializing =
      isInitializing ||
      [accounts, konnectors, triggers].find(collection =>
        ['pending', 'loading'].includes(collection.fetchStatus)
      )

    return (
      <CozyTheme variant="normal" className="u-pos-absolute">
        <div className="coz-service">
          {isInitializing && (
            <div className="coz-service-loading">
              <Spinner size="xxlarge" />
            </div>
          )}
          {error && (
            <div className="coz-error coz-service-error">
              <p>{t(error.message)}</p>
              <p>{t('intent.service.error.cause', { error: error.reason })}</p>
            </div>
          )}
          {!isInitializing && !error && (
            // Here we should render a component based on the intent action.
            // For now, our action is only CREATE on io.cozy.accounts. So here
            // we should render a component named CreateAccountService.
            // IntentService is just here for legacy reason and should
            // disappear.
            // In the future we may test the intent action and render a
            // specific component for every action.
            <IntentService
              appData={appData}
              data={service.getData()}
              onTerminate={account => this.terminate(account)}
              onCancel={() => this.cancel()}
              service={service}
            />
          )}
        </div>
      </CozyTheme>
    )
  }
}

export default appEntryPoint(translate()(withClient(IntentHandler)))
