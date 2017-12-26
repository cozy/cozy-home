import React, { Component } from 'react'
import { cozyConnect } from 'redux-cozy-client'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import CreateAccountService from '../components/services/CreateAccountService'
import ServiceBar from '../components/services/ServiceBar'
import ServiceKonnectorsList from '../components/services/ServiceKonnectorsList'

import { initializeRegistry } from '../ducks/registry'
import { fetchAccounts } from '../ducks/accounts'
import { getConnectionsStatusesByKonnectors } from '../ducks/connections'
import { fetchKonnectorJobs } from '../ducks/jobs'
import { fetchKonnectors } from '../ducks/konnectors'
import { fetchTriggers } from '../ducks/triggers'

class IntentService extends Component {
  constructor(props, context) {
    super(props, context)
    this.store = context.store

    const { window } = props

    this.state = {
      isFetching: true
    }

    props.initializeRegistry(props.initKonnectors)

    // Maybe the logic about getting the intent from location.search should be
    // encapsulated in cozy.client.createService
    const intent = window.location.search.split('=')[1]

    this.store
      .fetchInitialData(props.data.cozyDomain, 7200)
      .then(() => this.store.createIntentService(intent, window))
      .then(service => {
        const data = service.getData()
        if (!data) {
          throw new Error('Unexpected data from intent')
        }

        this.setState({
          service: service,
          disableSuccessTimeout: !!data.disableSuccessTimeout,
          closeable: data.closeable !== undefined ? data.closeable : true
        })

        if (data.slug) {
          return this.store
            .fetchKonnectorInfos(data.slug)
            .then(konnector => [konnector])
        } else if (data.dataType) {
          return this.store.findByDataType(data.dataType)
        } else if (data.category) {
          return this.store.findByCategory(data.category)
        }
      })
      .then(konnectorsList => {
        if (!konnectorsList) {
          throw new Error(`Unknown konnector`)
        } else {
          konnectorsList.forEach(konnector => {
            konnector.status = props.connectionStatuses[konnector.slug]
          })

          this.setState({
            isFetching: false,
            konnectorsList: konnectorsList,
            // We show the konnector if the konnectorsList contain only 1 item
            konnector: konnectorsList.length === 1 ? konnectorsList[0] : null
          })
        }

        return konnectorsList
      })
      .catch(error => {
        this.setState({
          isFetching: false,
          error: {
            message: 'intent.service.error.initialization',
            reason: error.message
          }
        })
      })
  }

  terminate(account) {
    const { service, konnector, konnectorsList } = this.state
    // Update konnectors status before rendering the konnectors List
    konnectorsList.forEach(konnector => {
      konnector.status = this.props.connectionStatuses[konnector.slug]
    })
    this.setState({
      isFetching: false,
      konnector: konnectorsList.length > 1 ? null : konnector
    })
    service.terminate(account)
  }

  cancel() {
    const { service } = this.state

    service.cancel ? service.cancel() : service.terminate(null)
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

  showKonnector(konnector) {
    this.setState({
      konnector: konnector
    })
  }

  render() {
    const { accounts, data, konnectors, triggers } = this.props
    const {
      error,
      konnectorsList,
      konnector,
      disableSuccessTimeout,
      closeable
    } = this.state

    const { t } = this.context

    let { isFetching } = this.state

    isFetching =
      isFetching ||
      [accounts, konnectors, triggers].find(collection =>
        ['pending', 'loading'].includes(collection.fetchStatus)
      )

    return (
      <div className="coz-service">
        {isFetching && (
          <div className="coz-service-loading">
            <Loading />
          </div>
        )}
        {error && (
          <div className="coz-error coz-service-error">
            <p>{t(error.message)}</p>
            <p>{t('intent.service.error.cause', { error: error.reason })}</p>
          </div>
        )}
        <div className="coz-service-layout">
          <ServiceBar
            appEditor={data.cozyAppEditor}
            appName={data.cozyAppName}
            iconPath={`../${data.cozyIconPath}`}
            onCancel={() => this.cancel()}
            closeable={closeable}
            hasReturnToKonnectorsListButton={
              !isFetching && !error && konnectorsList.length > 1 && konnector
            }
            returnToKonnectorsList={() => this.setState({ konnector: null })}
            {...this.context}
          />
          {!isFetching &&
            !error &&
            konnector && (
              <CreateAccountService
                alertDeleteSuccess={() => this.setState({ konnector: null })}
                konnector={konnector}
                onCancel={() => this.setState({ konnector: null })}
                onSuccess={() => this.setState({ konnector: null })}
                disableSuccessTimeout={disableSuccessTimeout}
                closeModal={() => this.setState({ konnector: null })}
                {...this.context}
              />
            )}
          {!isFetching &&
            !error &&
            konnectorsList.length > 1 &&
            !konnector && (
              <ServiceKonnectorsList
                konnectorsList={konnectorsList}
                showKonnector={konnector => this.showKonnector(konnector)}
              />
            )}
        </div>
      </div>
    )
  }
}

const mapActionsToProps = dispatch => ({
  initializeRegistry: konnectors => dispatch(initializeRegistry(konnectors))
})

const mapDocumentsToProps = (state, ownProps) => ({
  accounts: fetchAccounts(),
  jobs: fetchKonnectorJobs(),
  konnectors: fetchKonnectors(),
  triggers: fetchTriggers()
  // TODO: fetch registry
  // registry: fetchRegistry()
})

const mapStateToProps = (state, ownProps) => ({
  connectionStatuses:
    (ownProps.konnectorsList &&
      getConnectionsStatusesByKonnectors(
        state.connections,
        ownProps.konnectorsList.map(konnector => konnector.slug)
      )) ||
    []
})

export default cozyConnect(mapDocumentsToProps)(
  connect(mapStateToProps, mapActionsToProps)(IntentService)
)
