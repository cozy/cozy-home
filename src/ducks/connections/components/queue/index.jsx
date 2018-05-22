import Queue from './queue'
import { connect } from 'react-redux'

import { getConnectionsQueue } from '../../../../reducers'

import { purgeQueue } from '../../'

const mapStateToProps = state => {
  const queue = getConnectionsQueue(state)
  return {
    queue: queue,
    visible: !!queue.length
  }
}
const mapDispatchToProps = dispatch => ({
  purgeQueue: () => dispatch(purgeQueue())
})
export default connect(mapStateToProps, mapDispatchToProps)(Queue)
