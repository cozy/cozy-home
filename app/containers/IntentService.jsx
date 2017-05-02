/** @jsx h */
import { h, Component } from 'preact'

import Loading from '../components/Loading'
import ServiceBar from '../components/services/ServiceBar'

export default class IntentService extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = context.store

    const {window} = props

    this.state = {
      isFetching: true
    }

    // Maybe the logic about getting the intent from location.search should be
    // encapsulated in cozy.client.createService
    const intent = window.location.search.split('=')[1]

    this.store.createIntentService(intent, window)
      .then(service => {
        this.setState({
          service: service
        })

        const data = service.getData()

        if (!data || !data.slug) {
          throw new Error('Unexpected data from intent')
        }

        return this.store.fetchKonnectorInfos(data.slug)
      })
      .then(konnector => {
        if (!konnector) {
          throw new Error(`Unknown konnector`)
        }

        this.setState({
          isFetching: false,
          konnector: konnector
        })

        return konnector
      })
      .catch(error => {
        this.setState({
          isFetching: false,
          error: error
        })
      })
  }

  onTerminate () {
    const { service } = this.state

    const accountMock = {
      _id: '1111aaaa11111aaaab'
    }

    service.terminate(accountMock)
  }

  onCancel () {
    const { service } = this.state

    service.cancel
      ? service.cancel()
        : service.terminate(null)
  }

  render () {
    const { data } = this.props
    const { isFetching, error, konnector } = this.state
    const { t } = this.context
    return (
      <div class='coz-service'>
        { isFetching && <Loading /> }
        { error && <div class='coz-error coz-service-error'>
          <h1>{t('intent.service.error')}</h1>
          <p>{t('intent.service.error.cause', {error: error.message})}</p>
        </div>}
        { !isFetching && !error && konnector &&
          <div class='coz-service-layout'>
            <ServiceBar
              title={data.cozyAppName}
              iconPath={`../${data.cozyIconPath}`}
              onCancel={() => this.onCancel()}
             />
            <div class='coz-service-content'>
              <h1>{konnector.name}</h1>
              <div>
                <button
                  class='coz-btn coz-btn--secondary'
                  onClick={() => this.onCancel()}>
                  {t('intent.service.cancel')}
                </button>
                <button
                  class='coz-btn cozy-btn--highlight'
                  onClick={() => this.onTerminate()}>
                  {t('intent.service.terminate')}
                </button>
              </div>
            </div>
          </div>
        }
      </div>)
  }
}
