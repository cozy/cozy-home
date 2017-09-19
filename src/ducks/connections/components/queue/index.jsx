import Queue from './queue'
import { connect } from 'react-redux'

import {
  getQueue,
  getRunConnections,
  getSuccessfulRun
} from '../../../../reducers'

import {
  purgeQueue
} from '../../'

const mapStateToProps = (state, ownProps) => ({
  queue: getQueue(state),
  doneCount: getRunConnections(state),
  successCount: getSuccessfulRun(state)
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  purgeQueue: () => dispatch(purgeQueue())
})
export default connect(mapStateToProps, mapDispatchToProps)(Queue)
