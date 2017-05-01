/** @jsx h */
import { h, Component } from 'preact'

import Loading from '../components/Loading'

export default class IntentService extends Component {
  constructor (props, context) {
    super(props, context)
    this.store = context.store

    const {window} = props

    this.state = {
      isFetching: true
    }

    // Maybe the logic getting the intent from location.search should be
    // encapsulated in cozy.client.createService
    const intent = window.location.search.split('=')[1]

    this.store.createIntentService(intent, window)
      .then(service => this.setState({
        isFetching: false,
        service: service
      }))
      .catch(error => {
        this.setState({
          isFetching: false,
          error: error
        })
      })
  }

  render () {
    const { isFetching, error } = this.state
    const { t } = this.context
    return (
      <div class='coz-service'>
        { isFetching && <Loading /> }
        { error && <div class='coz-error coz-service-error'>
          <h1>{t('intent.service.error')}</h1>
          <p>{t('intent.service.error.cause', {error: error})}</p>
        </div>}
      </div>
    )
  }
}
