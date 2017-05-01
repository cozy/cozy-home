/* global cozy */
/** @jsx h */
import { h, Component } from 'preact'

import Loading from '../components/Loading'

export default class IntentService extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFetching: true
    }
  }

  render () {
    const { isFetching } = this.state
    return (
      <div>
        { isFetching && <Loading /> }
      </div>
    )
  }
}
